import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FlickrService } from '@app/services/flickr/flickr.service';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.scss']
})
export class KeywordSearchComponent implements OnInit {

  @ViewChild('queryField') queryField: NgModel;
  public query: string;

  constructor(
    private _flickrService: FlickrService
  ) { }

  ngOnInit() {}

  search() {
    this._flickrService.search(this.query);
  }

}
