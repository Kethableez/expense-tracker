import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const EXPENSES_ROUTES: Route[] = [
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./expenses.component').then(
        (expenses) => expenses.ExpensesComponent
      ),
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./components/list/list.component').then(
            (list) => list.ListComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (categories) => categories.CategoriesComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./components/create/create.component').then(
            (create) => create.CreateComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
