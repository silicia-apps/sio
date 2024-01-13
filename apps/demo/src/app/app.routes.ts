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
    path: 'database',
    loadComponent: () =>
      import('./database/database.page').then((m) => m.DatabasePageComponent)
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
