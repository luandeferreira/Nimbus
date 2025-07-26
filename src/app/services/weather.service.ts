import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) { }

  getForecast(query: string): Observable<Weather> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', query)
      .set('days', '5')
      .set('lang', 'pt');
    return this.http.get<Weather>(`${this.apiUrl}/forecast.json`, { params });
  }

  searchCities(query: string): Observable<any[]> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', query);
    return this.http.get<any[]>(`${this.apiUrl}/search.json`, { params });
  }
}
