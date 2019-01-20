import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { ResultsService } from '@app/services/results/results.service';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.scss']
})
export class KeywordSearchComponent implements OnInit {

  @ViewChild('queryField') queryField: NgModel;
  public query: string;

  constructor(
    private _flickrService: FlickrService,
    private _resultService: ResultsService
  ) { }

  ngOnInit() {}

  search() {
    this._flickrService.searchPhotos(this.query).subscribe(results => {
      this._resultService.display(results, {query: this.query, page: 1});
    });
  }

}
