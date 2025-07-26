import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  @Input() current: any;
  @Input() location: any;

  getConditionClass(conditionText: string): string {
    if (!conditionText) return '';
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) {
      return 'icon-sunny';
    }
    if (text.includes('rain') || text.includes('drizzle')) {
      return 'icon-rainy';
    }
    if (text.includes('cloud') || text.includes('overcast')) {
      return 'icon-cloudy';
    }
    if (text.includes('snow') || text.includes('sleet') || text.includes('ice')) {
      return 'icon-rainy'; // Using blue for cold
    }
    return '';
  }
}