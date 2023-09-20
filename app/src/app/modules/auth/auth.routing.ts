import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth.component').then((auth) => auth.AuthComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./components/sign-in/sign-in.component').then(
            (signIn) => signIn.SignInComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./components/sign-up/sign-up.component').then(
            (signUp) => signUp.SignUpComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      },
    ],
  },
];
