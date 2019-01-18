import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { FlickrRequest } from './flickr-request';
import { getHttpParams } from 'src/app/helpers/get-http-params';
import { FlickrSearchResult } from './flickr-response';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private _apiEndPoint = environment.apiBaseUrl + '/flickr';

  constructor(
    private http: HttpClient,
  ) { }

  search(query: string, page = 1): Subject<FlickrSearchResult> {
    const request: FlickrRequest = { query, page };
    const params = getHttpParams(request);
    const resultSubject: Subject<FlickrSearchResult> = new Subject();

    this.http.get(this._apiEndPoint, { params }).subscribe((response) =>
      // Process the results
      resultSubject.next(<FlickrSearchResult> JSON.parse(response['text']))
    );
    return resultSubject;
  }
}
