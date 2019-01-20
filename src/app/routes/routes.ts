import { ErrorComponent } from '../error/error.component';
import { LayoutComponent } from '../layout/layout.component';
import { KeywordSearchComponent } from '../keyword-search/keyword-search.component';
import { TwitterComponent } from '@app/twitter/twitter.component';
import { WeatherComponent } from '@app/weather/weather.component';
import { NewsComponent } from '@app/news/news.component';

export const routes = [

  /**
   * The layout component provides a basic page structure
   * to display the header, nav and content
   */
  {
    path: '',
    component: LayoutComponent,

    /* CONTENT PAGES */
    children: [

      /**
       * The default keyword search component
       */
      {
        path: '',
        component: KeywordSearchComponent
      },
      {
        path: 'twitter',
        component: TwitterComponent
      },
      {
        path: 'weather',
        component: WeatherComponent
      },
      {
        path: 'news',
        component: NewsComponent
      }
    ]
  },
  /**
   * Show a 404 error for pages that don't exist
   */
  {
    path: '**',
    component: ErrorComponent
  }
];
