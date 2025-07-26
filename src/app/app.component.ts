import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weather$: Observable<any> | undefined;

  constructor(private weatherService: WeatherService, public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.getLocation();
  }

  onSearch(city: string): void {
    this.weather$ = this.weatherService.getForecast(city);
  }

  private getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weather$ = this.weatherService.getForecast(`${lat},${lon}`);
      }, (error) => {
        console.error('Error getting location', error);
        // Fallback to a default city if location is not available
        this.weather$ = this.weatherService.getForecast('São Paulo');
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default city if geolocation is not supported
      this.weather$ = this.weatherService.getForecast('São Paulo');
    }
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
