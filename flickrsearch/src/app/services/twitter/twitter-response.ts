export interface TwitterTrendingResponse {
  as_of: string;
  created_at: string;
  locations: Array<{ name: string; woeid: number }>;
  trends: Array<TwitterTrend>;
}

export interface TwitterTrend {
  name: string;
  url: string;
  promoted_content: string;
  query: string;
  tweet_volume: number;
}
