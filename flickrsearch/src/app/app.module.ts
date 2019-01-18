import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { RoutesModule } from './routes/routes.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './error/error.component';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    KeywordSearchComponent,
    LayoutComponent,
    NavigationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
