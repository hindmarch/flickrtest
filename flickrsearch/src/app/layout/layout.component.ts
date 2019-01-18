import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconService } from '../icons/icon.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

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
