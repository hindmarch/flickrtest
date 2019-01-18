import { NgModule } from '@angular/core';

import {
  MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { IconService } from '../icons/icon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlickrService } from '../services/flickr/flickr.service';

@NgModule({
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
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
        FlickrService
      ]
    };
  }
}
