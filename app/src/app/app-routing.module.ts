import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AUTH_ROUTES } from './modules/auth/auth.routing';
import { DASHBOARD_ROUTES } from './modules/dashboard/dashboard.routes';
import { EXPENSES_ROUTES } from './modules/expenses/expenses.routes';
import { ACCOUNT_ROUTES } from './modules/accounts/accounts.routes';

const routes: Routes = [
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...EXPENSES_ROUTES,
  ...ACCOUNT_ROUTES,
  {
    path: 'playground',
    loadComponent: () =>
      import('./modules/playground/playground.component').then(
        (playground) => playground.PlaygroundComponent
      ),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
