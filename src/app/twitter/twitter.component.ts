import { Component, OnInit } from '@angular/core';
import { TwitterService } from '@app/services/twitter/twitter.service';
import { TwitterTrend } from '@app/services/twitter/twitter-response';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { ResultsService } from '@app/services/results/results.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  public trends: Array<TwitterTrend>;
  public trendLocation: string;

  constructor(
    private _twitterService: TwitterService,
    private _flickrService: FlickrService,
    private _resultService: ResultsService
  ) { }

  ngOnInit() {
    this._twitterService.trending().subscribe(response => {
      this.trends = response.trends;
      this.trendLocation = response.locations[0].name;
    });
  }

  searchForTrend(trend: TwitterTrend) {
    // Remove non alphanumeric characters like #
    const term = trend.name.replace(/[^\w\d\s]/g, '');

    this._flickrService.searchPhotos(term, 1).subscribe(
      results => this._resultService.display(results, { query: term, page: 1})
    );
  }

}
