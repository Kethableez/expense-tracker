import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const ACCOUNT_ROUTES: Route[] = [
  {
    canActivate: [AuthGuard],
    path: 'accounts',
    loadComponent: () =>
      import('./accounts.component').then(
        (accounts) => accounts.AccountsComponent
      ),
  },
];
