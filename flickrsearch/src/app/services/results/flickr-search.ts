import { FlickrRequest } from '../flickr/flickr-request';
import { FlickrSearchResult } from '../flickr/flickr-response';

export interface FlickrSearch {
  query: FlickrRequest;
  results: FlickrSearchResult;
}
