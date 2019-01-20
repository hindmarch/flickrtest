import { FlickrSearchResultPhoto } from '@app/services/flickr/flickr-response';

export function getFlickrUrl(photo: FlickrSearchResultPhoto, size: FlickrPhotoSize): string {
  return `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
}

export enum FlickrPhotoSize {
  THUMB = 'q',
  LARGE = 'b'
}
