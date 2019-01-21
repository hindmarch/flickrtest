import { FlickrService } from '../services/flickr/flickr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconService } from '@app/services/icons/icon.service';
import { InterceptorService } from '@app/services/interceptor/interceptor.service';
import {
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule
  } from '@angular/material';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NewsService } from '@app/services/news/news.service';
import { NgModule } from '@angular/core';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { TwitterService } from '@app/services/twitter/twitter.service';
import { WeatherService } from '@app/services/weather/weather.service';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PerfectScrollbarModule,
    RouterModule
  ],
  exports: [
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PerfectScrollbarModule,
    RouterModule
  ]
})
export class SharedModule {

  // We provide services here so we can support lazy loading in the future
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        IconService,
        InterceptorService,
        FlickrService,
        TwitterService,
        WeatherService,
        NewsService,
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
      ]
    };
  }
}
