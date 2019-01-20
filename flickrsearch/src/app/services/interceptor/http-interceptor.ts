import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterceptorService } from './interceptor.service';
import { tap } from 'rxjs/operators';

/**
 * This interceptor works with Angular's HTTP service to 'intercept' HTTP requests.
 * It's usually used for auth tokens, but in this case we want to connect it to a
 * service to indicate that we're waiting for something to load.
 */

@Injectable()
export class FlickrFinderInterceptor implements HttpInterceptor {
  constructor(
    private _interceptorService: InterceptorService
  ) {}

  /**
   * The intercept function allows us to piggyback on the HTTP request
   *
   * @param request The request
   * @param next The HTTP service's handler for the request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Tell service that the request is made
    this._interceptorService.loading = true;
    return next.handle(request).pipe(
      // Tell service that response is received
      tap(() => this._interceptorService.loading = false)
    );
  }
}
