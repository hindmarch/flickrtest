import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { FlickrSearchResult } from '../flickr/flickr-response';
import { NavigationItemReference } from '@app/navigation/navigation-item';
import { FlickrRequest } from '../flickr/flickr-request';
import { FlickrSearch } from './flickr-search';

/**
 * The results service does 2 things:
 * 1. Provide results to the results component
 * 2. Indicate whether the results component is being displayed
 */

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // Contains the search (from the Flickr service)
  private _search: Subject<FlickrSearch> = new Subject();
  public search$: Observable<FlickrSearch> = this._search.asObservable();

  // Show/hide the component
  private _resultsDisplayed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public resultsDisplayed$: Observable<boolean> = this._resultsDisplayed.asObservable();

  constructor() { }

  /**
   * Provides instructions for the results component to display the photos
   * @param results The results to display
   * @param query The originating query
   */
  display(results: FlickrSearchResult, query: FlickrRequest) {
    this._search.next(<FlickrSearch> { query, results });
    this._resultsDisplayed.next(true);
  }

  hide() {
    this._resultsDisplayed.next(false);
  }
}
