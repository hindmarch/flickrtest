import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconService } from '../icons/icon.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();
  public iconsAvailable = false;

  constructor(
    private _iconService: IconService
  ) { }

  ngOnInit() {
    this._iconService.iconsLoaded$.pipe(takeUntil(this._destroy)).subscribe(loaded => {
      // When the icons are available, use change detection to instruct
      // the template that it can now try and show the icons
      if (loaded) { this.iconsAvailable = true; }
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

}
