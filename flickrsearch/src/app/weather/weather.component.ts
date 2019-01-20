import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@app/services/weather/weather.service';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { ResultsService } from '@app/services/results/results.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public description: string;
  public temperatureC: number;

  constructor(
    private _weatherService: WeatherService,
    private _flickrService: FlickrService,
    private _resultsService: ResultsService
  ) { }

  ngOnInit() {
    this._weatherService.getDublinWeather().subscribe(response => {
      this.description = response.weather[0].description;
      this.temperatureC = response.main.temp;
    });
  }

  getPhotosForWeather() {
    this._flickrService.searchPhotos(this.description, 1).subscribe(
      results => this._resultsService.display(results, {query: this.description, page: 1})
    );
  }

}
