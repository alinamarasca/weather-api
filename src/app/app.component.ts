import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  startWith,
  scan,
  distinctUntilChanged,
  Observable,
} from 'rxjs';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  cityControl = new FormControl();
  selectedCity: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cityControl.valueChanges
      .pipe(
        // distinctUntilChanged(),
        debounceTime(500),
        startWith('Gent'),
        (value) => (this.selectedCity = value)
      )
      .subscribe((value) => {
        console.log(value);
        this.router.navigate([value]);
      });
  }

  ngOnDestroy() {}
}
