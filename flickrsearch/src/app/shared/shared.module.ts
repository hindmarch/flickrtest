import { NgModule } from '@angular/core';

import {
  MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { IconService } from '../icons/icon.service';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MatFormFieldModule,
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
        IconService
      ]
    };
  }
}
