import { Component, Input } from '@angular/core';
import { ForecastDay } from '../../models/weather.model';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css']
})
export class ForecastListComponent {
  @Input() forecastDays: ForecastDay[] = [];
}
