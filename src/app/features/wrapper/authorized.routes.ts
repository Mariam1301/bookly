import { Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';

export const authorizedRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'services',
        loadComponent: () =>
          import('../services-page/services-page.component').then(
            (m) => m.ServicesPageComponent
          ),
      },

      {
        path: '**',
        redirectTo: 'services',
      },
    ],
  },
];
