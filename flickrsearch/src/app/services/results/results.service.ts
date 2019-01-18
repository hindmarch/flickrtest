import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { FlickrSearchResult } from '../flickr/flickr-response';
import { NavigationItemReference } from '@app/navigation/navigation-item';
import { FlickrRequest } from '../flickr/flickr-request';

/**
 * The results service does 2 things:
 * 1. Provide results to the results component
 * 2. Indicate whether the results component is being displayed
 */

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // Contains the results (from the Flickr service)
  private _results: Subject<FlickrSearchResult> = new Subject();
  public results$: Observable<FlickrSearchResult> = this._results.asObservable();

  // Contains information about the originating query that generated the results
  private _query: Subject<FlickrRequest> = new Subject();
  public query$: Observable<FlickrRequest> = this._query.asObservable();

  // Show/hide the component
  private _resultDisplayed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public resultDisplayed$: Observable<boolean> = this._resultDisplayed.asObservable();

  constructor() { }

  /**
   * Provides instructions for the results component to display the photos
   * @param results The results to display
   * @param query The originating query
   */
  display(results: FlickrSearchResult, query: FlickrRequest) {
    this._results.next(results);
    this._query.next(query);
    this._resultDisplayed.next(true);
  }
}
