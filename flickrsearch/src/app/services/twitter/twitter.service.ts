import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { TwitterTrendingResponse } from './twitter-response';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private _apiEndPoint = environment.apiBaseUrl + '/twitter';

  constructor(
    private _http: HttpClient
  ) { }

  public trending(): Subject<TwitterTrendingResponse> {
    const returnSubject: Subject<TwitterTrendingResponse> = new Subject();
    this._http.get(`${this._apiEndPoint}/trending`).subscribe((result: Array<TwitterTrendingResponse>) => {
      returnSubject.next(result[0]);
      returnSubject.complete();
    });
    return returnSubject;
  }
}
