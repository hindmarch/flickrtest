import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ResultsService } from '@app/services/results/results.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlickrSearchResultPhoto, FlickrTag, FlickrUser } from '@app/services/flickr/flickr-response';
import { getFlickrUrl, FlickrPhotoSize } from '@app/helpers/get-flickr-url';
import { FlickrSearch } from '@app/services/results/flickr-search';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

interface ThumbnailDisplay {
  url: string;
  photo: FlickrSearchResultPhoto;
}

interface PhotoDisplay {
  url: SafeUrl;
  user: FlickrUser;
  photo: FlickrSearchResultPhoto;
  tags: Array<FlickrTag>;
  datetaken: string;
  link: string;
}


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();

  private _photos: BehaviorSubject<Array<ThumbnailDisplay>> = new BehaviorSubject([]);
  public photos$: Observable<Array<ThumbnailDisplay>> = this._photos.asObservable();

  // Provides access to the search$ stream to the template
  private _search: Subject<FlickrSearch> = new Subject();
  public search$: Observable<FlickrSearch> = this._search.asObservable();

  public largePhoto: PhotoDisplay;

  private _page = 1;
  private _query: string;

  constructor(
    private _resultsService: ResultsService,
    private _flickrService: FlickrService,
    private _ngZone: NgZone,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    // Subscribe to the results feed, create an array of photo URLs and populate local search$ stream
    this._resultsService.search$.pipe(takeUntil(this._destroy)).subscribe(search => {
      const photos = search.results.photos.photo;

      // Clear current results
      this._photos.next([]);
      this.largePhoto = null;

      this._query = search.query.query;
      this._page = search.query.page;

      this._displayPhotos(photos);
      this._search.next(search);
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  /**
   * Creates place holder objects in the result array to display something whilst we wait for the API response
   */
  loadMoreImages() {
    // Place holder
    this._page ++;

    // Request new photos
    this._flickrService.searchPhotos(this._query, this._page).subscribe(results =>
      this._displayPhotos(results.photos.photo)
    );
  }

  /**
   * Closes the results panel
   */
  hideSearchResults() {
    this._resultsService.hide();
  }

  /**
   * Provides the object to display the full size image, along with user data
   * @param photo The photo object (supplied by thumbnail)
   */
  showFullSizePhoto(photo: FlickrSearchResultPhoto) {

    // The URL of the photo (that will require processing into a safe URL)
    const unprocessedUrl = getFlickrUrl(photo, FlickrPhotoSize.LARGE);

    // Angular puts a CSRF block on unsafe URLS, so we'll stop that from happening with the sanitizer
    const url: SafeUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${unprocessedUrl})`);

    // Call the Flickr service to get the photo data for the selected photo
    this._flickrService.getInfo(photo.id).subscribe(info => {
      const user = info.photo.owner;

      const link = info.photo.urls.url[0]._content;

      // Get the tags. Some people add a huge number of tags. For display purposes we'll limit it to 5
      const tags = info.photo.tags && info.photo.tags.tag.slice(0, 5);

      // The `datetaken` value will be formatted using Angular's date pipe
      const datetaken = info.photo.dates.taken;

      // Provide the object to the template
      this.largePhoto = { url, user, photo, tags, datetaken, link };
    });
  }

  hideFullSizePhoto() {
    this.largePhoto = null;
  }

  /**
   * If a user clicks a tag, search for photos for the tag
   * @param tag The tag to search for
   */
  searchForTag(tag: string) {
    this._flickrService.searchPhotos(tag, 1).subscribe(results => this._resultsService.display(results, {query: tag, page: 1}));
  }

  private _displayPhotos(photos: Array<FlickrSearchResultPhoto>) {
    const newPhotos = photos.map(photo => {
      return {
        url: getFlickrUrl(photo, FlickrPhotoSize.THUMB),
        photo: photo
      };
    });

    // Get current photos
    const photoCollection = this._photos.getValue();

    // Add new photos
    photoCollection.push(... newPhotos);

    // Ensure the call result is triggered within the angular zone
    // from: https://github.com/angular/angular/issues/7381#issuecomment-191456151
    this._ngZone.run(() =>  this._photos.next(photoCollection));
  }
}
