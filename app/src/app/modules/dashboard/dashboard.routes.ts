import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const DASHBOARD_ROUTES: Route[] = [
  {
    canActivate: [AuthGuard],
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard.component').then(
        (dashboard) => dashboard.DashboardComponent
      ),
  },
  {
    canActivate: [AuthGuard],
    path: 'analytics',
    loadComponent: () =>
      import('./dashboard.component').then(
        (dashboard) => dashboard.DashboardComponent
      ),
    children: [
      {
        path: 'income',
        loadComponent: () =>
          import('./dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
      {
        path: 'outcome',
        loadComponent: () =>
          import('./dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
      {
        path: 'loafey',
        loadComponent: () =>
          import('./dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
    ],
  },
  {
    canActivate: [AuthGuard],
    path: 'settings',
    loadComponent: () =>
      import('./dashboard.component').then(
        (dashboard) => dashboard.DashboardComponent
      ),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
      {
        path: 'app',
        loadComponent: () =>
          import('./dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
    ],
  },
];
