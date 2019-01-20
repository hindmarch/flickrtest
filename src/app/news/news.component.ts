import { Component, OnInit } from '@angular/core';
import { NewsService } from '@app/services/news/news.service';
import { HeadlineKeyword } from '@app/services/news/news-response';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { ResultsService } from '@app/services/results/results.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public keywords: Array<HeadlineKeyword>;

  constructor(
    private _newsService: NewsService,
    private _flickrService: FlickrService,
    private _resultsService: ResultsService
  ) { }

  ngOnInit() {
    this._newsService.headlines().subscribe(response => {
      this.keywords = response.keywords;
    });
  }

  searchForKeyword(keyword: HeadlineKeyword) {
    this._flickrService.searchPhotos(keyword.word, 1).subscribe(
      results => this._resultsService.display(results, {query: keyword.word, page: 1})
    );
  }

}
