import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  WEATHER_API_URL: string = 'https://api.openweathermap.org/data/2.5/weather'
  WEATHER_API_KEY: string = '9e68a46b0e66dbd6d3bceab62205e96a'

  constructor(private httpClient: HttpClient) { }

  getWeatherFromApi(city: string): Promise<any> {

    let query: HttpParams = new HttpParams()
      .set('q', city)
      .set('appid', this.WEATHER_API_KEY)

    return lastValueFrom(
      this.httpClient.get(
        this.WEATHER_API_URL, { params: query })
    )
  }
}
