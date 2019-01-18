export interface FlickrSearchResult {
  photos: {
    page: number,
    pages: number,
    perpage: number,
    total: string, // No idea why Flickr send total as a string?
    photo: Array<FlickrSearchResultPhoto>
  };
  stat: string;
}

export interface FlickrSearchResultPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}
