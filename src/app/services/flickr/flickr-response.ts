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

export interface FlickrPhoto {
  photo: {
    id: string;
    secret: string;
    server: string;
    farm: number;
    dateuploaded: string;
    isfavorite: string;
    license: string;
    safety_level: string;
    rotation: number;
    originalsecret: string;
    originalformat: string;
    owner: FlickrUser;
    title: { _content: string; };
    description: { _content: string; };
    visibility: {
      ispublic: number;
      isfriend: number;
      isfamily: number;
    };
    dates: {
      posted: string;
      taken: string;
      takengranularity: number;
      takenunknown: string;
      lastupdate: string;
    };
    views: string;
    editibility: {
      cancomment: number;
      canaddmeta: number;
    };
    publiceditability: {
      cancomment: number;
      canaddmeta: number;
    };
    usage: {
      candownload: number;
      canblog: number;
      canprint: number;
      canshare: number;
    }
    comments: { _content: string; };
    notes: {
      note: Array<string>
    };
    people: {
      haspeople: 0;
    }
    tags: {
      tag: Array<FlickrTag>;
    };
    urls: {
      url: Array<{ type: string; _content: string; }>;
    }
    media: string;
  };
  stat: string;
}

export interface FlickrTag {
  id: string;
  author: string;
  authorname: string;
  raw: string;
  _content: string;
  machine_tag: boolean;
}

export interface FlickrUser {
  nsid: string;
  username: string;
  realname: string;
  location: string;
  iconserver: string;
  iconfarm: number;
  path_alias: string;
}
