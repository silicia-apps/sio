import { Routes } from '@angular/router';
import { SioAuthGuard } from '@silicia/auth';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePageComponent),
    canActivate: [SioAuthGuard],
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./buttons/buttons.page').then((m) => m.ButtonsPageComponent)
  },
  {
    path: 'info',
    loadComponent: () =>
      import('./info/info.page').then((m) => m.InfoPageComponent),
      canActivate: [SioAuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
