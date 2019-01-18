import { ErrorComponent } from '../error/error.component';
import { LayoutComponent } from '../layout/layout.component';
import { KeywordSearchComponent } from '../keyword-search/keyword-search.component';

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
