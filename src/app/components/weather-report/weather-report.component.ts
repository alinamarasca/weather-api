import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, Observable, startWith, tap } from 'rxjs';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
})
export class WeatherReportComponent implements OnInit {
  data$!: Observable<any>;
  weather$!: Observable<any>;

  isSmallerScreen$ = new Observable<boolean>();
  isSmallScreen$ = new Observable<boolean>();

  constructor(
    private weatherApi: WeatherApiService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isSmallScreen$ = this.breakpointObserver
      .observe('(max-width:500px)')
      .pipe(map(({ matches }) => matches));

    this.data$ = this.route.params.pipe(
      map((params) => params['city']),
      filter((name) => !!name),
      mergeMap((name) =>
        this.weatherApi.getWeather(name).pipe(
          tap((res) => {
            this.weather$ = res.weather[0].description;
          })
        )
      )
    );
  }
}
