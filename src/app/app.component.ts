import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  startWith,
  scan,
  distinctUntilChanged,
  Observable,
  tap,
  combineLatest,
  map,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  cityControl = new FormControl();
  selectedCity: any;

  isBigScreen$ = new Observable<boolean>();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isBigScreen$ = this.breakpointObserver
      .observe('(min-width:1070px)')
      .pipe(map(({ matches }) => matches));

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
