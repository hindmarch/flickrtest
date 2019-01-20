import { Injectable } from '@angular/core';
import { Subject, Observable, interval, BehaviorSubject } from 'rxjs';
import { throttle } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  // This tracks the number of pending requests
  private _requestCount = 0;

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _indicator: Subject<boolean> = new Subject();
  public indicator$: Observable<boolean> = this._indicator.asObservable();

  constructor() {
    const throttledLoading = this._loading.pipe(throttle(() => interval(1000)));
    throttledLoading.subscribe(loading => this._indicator.next(loading));

    interval(3000).subscribe(() => !this._requestCount && this._loading.next(false));
  }

  set loading (active: boolean) {
    this._requestCount = active ? +1 : -1;

    if (this._requestCount < 0) {
      this._requestCount = 0;
    }

    if (!this._loading.getValue() && this._requestCount > 0) {
      this._loading.next(true);
    }

  }
}
