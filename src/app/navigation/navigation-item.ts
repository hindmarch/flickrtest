export interface NavigationItem {
  ref: NavigationItemReference;
  icon: string;
  label: string;
  active?: boolean;
}

export enum NavigationItemReference {
  SEARCH = '',
  TWITTER = 'twitter',
  WEATHER = 'weather',
  NEWS = 'news'
}
