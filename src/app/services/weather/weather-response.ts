import { last } from 'rxjs/operators';

export interface WeatherResponse {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: { lon: number, lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  sys: {
    country: string;
    message: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  visibility: number;
  weather: Array<{ id: number; main: string; description: string; icon: string; }>;
  wind: { speed: number; deg: number; };
}
