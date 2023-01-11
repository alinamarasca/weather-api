import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, Observable, tap } from 'rxjs';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
})
export class WeatherReportComponent implements OnInit {
  data$!: Observable<any>;
  weather$!: Observable<any>;

  constructor(
    private weatherApi: WeatherApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
