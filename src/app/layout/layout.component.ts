import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconService } from '@app/services/icons/icon.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResultsService } from '@app/services/results/results.service';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { getFlickrUrl, FlickrPhotoSize } from '@app/helpers/get-flickr-url';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { InterceptorService } from '@app/services/interceptor/interceptor.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();
  public iconsAvailable = false;
  public displayResults = false;
  public backgroundPhoto: SafeUrl;
  public loading = false;

  constructor(
    private _iconService: IconService,
    private _resultService: ResultsService,
    private _flickrService: FlickrService,
    private _interceptorService: InterceptorService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // Listen for when the results should be displayed
    this._resultService.resultsDisplayed$.pipe(takeUntil(this._destroy)).subscribe(displayResults => {
      this.displayResults = displayResults;
    });

    // Subscribe to HTTP intercepted events
    this._interceptorService.indicator$.pipe(takeUntil(this._destroy)).subscribe(loading => this.loading = loading);

    // Indicate when icons are ready
    this._iconService.iconsLoaded$.pipe(takeUntil(this._destroy)).subscribe(loaded => {
      if (loaded) { this.iconsAvailable = true; }
    });

    // Get a pretty photo of Ireland for the background for the layout
    this._flickrService.ireland().subscribe(result => {
      // pick a random photo from the results
      const pointer = Math.floor(Math.random() * 100);
      const url = getFlickrUrl(result.photos.photo[pointer], FlickrPhotoSize.LARGE);
      this.backgroundPhoto = this._sanitizer.bypassSecurityTrustStyle(`url(${url})`);
      }
    );
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  hideResults() {
    this._resultService.hide();
  }

}
