import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Subject } from 'rxjs';
import { WeatherResponse } from './weather-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _apiEndPoint = environment.apiBaseUrl + '/weather';


  constructor(
    private _http: HttpClient
  ) { }

  public getDublinWeather(): Subject<WeatherResponse> {
    return <Subject<WeatherResponse>> this._http.get(`${this._apiEndPoint}/dublin`);
  }
}
