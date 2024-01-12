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
    path: 'storage',
    loadComponent: () =>
      import('./storage/storage.page').then((m) => m.StoragePageComponent),
      canActivate: [SioAuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
