import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { FlickrRequest } from './flickr-request';
import { getHttpParams } from 'src/app/helpers/get-http-params';
import { FlickrSearchResult, FlickrPhoto } from './flickr-response';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private _apiEndPoint = environment.apiBaseUrl + '/flickr';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Gets a collection of photos from Flickr
   * @param query The text to search for
   * @param page The page to fetch
   */
  searchPhotos(query: string, page = 1): Subject<FlickrSearchResult> {
    const request: FlickrRequest = { query, page };
    const params = getHttpParams(request);
    const resultSubject: Subject<FlickrSearchResult> = new Subject();

    this.http.get(`${this._apiEndPoint}/photos`, { params }).subscribe(response => {
      resultSubject.next(<FlickrSearchResult> JSON.parse(response['text']));
      resultSubject.complete();
    });
    return resultSubject;
  }

  /**
   * Gets info about a photo
   * @param id The photo ID
   */
  getInfo(id: string): Subject<FlickrPhoto> {
    const request = { id };
    const params = getHttpParams(request);
    const resultSubject: Subject<FlickrPhoto> = new Subject();
    this.http.get(`${this._apiEndPoint}/info`, { params }).subscribe(response => {
      resultSubject.next(JSON.parse(response['text']));
      resultSubject.complete();
    });
    return resultSubject;
  }

  /**
   * Gets a photo for the place id of Dublin.
   * Used to provide pretty BGs on the splash page
   */
  ireland(): Subject<FlickrSearchResult> {
    const resultSubject: Subject<FlickrSearchResult> = new Subject();
    this.http.get(`${this._apiEndPoint}/ireland`).subscribe(response => {
      resultSubject.next(<FlickrSearchResult> JSON.parse(response['text']));
      resultSubject.complete();
    });
    return resultSubject;
  }
}
