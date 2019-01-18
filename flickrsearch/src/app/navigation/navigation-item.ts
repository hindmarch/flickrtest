export interface NavigationItem {
  ref: NavigationItemReference;
  icon: string;
  label: string;
  active?: boolean;
}

export enum NavigationItemReference {
  SEARCH,
  TWITTER,
  WEATHER,
  NEWS
}
