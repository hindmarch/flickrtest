import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconService } from '../icons/icon.service';
import { NavigationItem, NavigationItemReference } from './navigation-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();
  public iconsAvailable = false;
  public navigationItemList: Array<NavigationItem> = [
    {
      ref: NavigationItemReference.SEARCH,
      icon: 'navigation:SEARCH',
      label: 'Search by keyword'
    },
    {
      ref: NavigationItemReference.TWITTER,
      icon: 'navigation:TWITTER',
      label: 'Trending Twitter tags'
    },
    {
      ref: NavigationItemReference.WEATHER,
      icon: 'navigation:WEATHER',
      label: 'Weather conditions'
    },
    {
      ref: NavigationItemReference.NEWS,
      icon: 'navigation:NEWS',
      label: 'News headline keywords'
    }
  ];

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

  navigateTo(ref: NavigationItemReference) {
    console.log('going to ', ref);
  }

}
