import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private _icons;
  private _iconPath = '/assets/icons';

  // Provides an emitter when the icons are available (templates will not display
  // properly until the icons are loaded)
  private _iconsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public iconsLoaded$: Observable<boolean> = this._iconsLoaded.asObservable();

  constructor(
    private http: HttpClient,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.loadIcons();
  }

  /**
   * Loads the icons from the registry file.
   */
  private loadIcons() {
    this.http.get('/assets/icons/icon-registry.json').subscribe(data => {
      this._icons = data['iconRegistry'];
      this._icons.map(namespaceObject => {
        const namespace = namespaceObject.namespace;
        for (const icon in namespaceObject.icons) {
          if (icon) {
            const url = namespaceObject.icons[icon];
            this.registerSvgIcon(namespace, icon, `${this._iconPath}/${url}.svg`);
          }
        }
      });
      this._iconsLoaded.next(true);
    });
  }

  /**
   * Icons loaded to be available as <mat-icon svgIcon="namespace:ICON"></mat-icon>
   *
   * @param namespace The namespace to use (all icons are loaded into a namespace)
   * @param icon The icon reference
   * @param url The URL to load from
   */
  private registerSvgIcon(namespace, icon, url) {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.iconRegistry.addSvgIconInNamespace(namespace, icon, sanitizedUrl);
  }
}
