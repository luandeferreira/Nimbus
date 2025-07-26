import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');
  filteredCities$: Observable<any[]> | undefined;
  isLoading = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.filteredCities$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(value => {
        if (value && value.length > 2) {
          return this.weatherService.searchCities(value);
        } else {
          return of([]);
        }
      }),
      tap(() => this.isLoading = false)
    );
  }

  onSearch(city: string): void {
    this.search.emit(city);
    this.searchControl.setValue(''); // Clear input after search
  }

  displayFn(city: any): string {
    return city && city.name ? city.name : '';
  }
}