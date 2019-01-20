import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Subject } from 'rxjs';
import { HeadlineResponse } from './news-response';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _apiEndPoint = environment.apiBaseUrl + '/news';

  constructor(
    private _http: HttpClient
  ) { }

  public headlines() {
    const returnSubject: Subject<HeadlineResponse> = new Subject();
    this._http.get(`${this._apiEndPoint}/ireland`).subscribe((result: HeadlineResponse) => {
      returnSubject.next(result);
      returnSubject.complete();
    });
    return returnSubject;
  }
}
