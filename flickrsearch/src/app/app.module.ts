import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { RoutesModule } from './routes/routes.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './error/error.component';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    KeywordSearchComponent,
    LayoutComponent,
    NavigationComponent,
    ErrorComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
