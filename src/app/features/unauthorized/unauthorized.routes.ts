import { Routes } from '@angular/router';

export const unauthorizedRoutes: Routes = [
  {
    path: 'signUp',
    loadComponent: () =>
      import('./registration-page/registration-page.component').then(
        (c) => c.RegistrationPageComponent
      ),
  },

  {
    path: 'signIn',
    loadComponent: () =>
      import('./login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];
