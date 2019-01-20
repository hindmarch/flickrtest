import { NgModule } from '@angular/core';

import {
  MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatGridListModule, MatProgressSpinnerModule, MatListModule, MatChipsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { IconService } from '../icons/icon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlickrService } from '../services/flickr/flickr.service';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InterceptorService } from '@app/services/interceptor/interceptor.service';
import { TwitterService } from '@app/services/twitter/twitter.service';
import { WeatherService } from '@app/services/weather/weather.service';
import { NewsService } from '@app/services/news/news.service';

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
