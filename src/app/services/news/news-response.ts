export interface HeadlineResponse {
  status: string;
  totalResults: number;
  keywords: Array<HeadlineKeyword>;
  articles: Array<HeadlineArticle>;
}

export interface HeadlineKeyword {
  word: string;
  count: number;
}

export interface HeadlineArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
