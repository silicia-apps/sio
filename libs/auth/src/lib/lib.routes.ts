import { Route } from '@angular/router';
import { SioAuthGuard} from './guards';

export const sioAuthRoutes: Route[] = [
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./pages/login').then((m) => m.SioAuthLoginPageModule),
  },
  {
    path: 'auth/signup',
    loadChildren: () =>
      import('./pages/signup').then((m) => m.SioAuthSignupPageModule),
  },
  {
    path: 'auth/profile',
    loadChildren: () =>
      import('./pages/profile').then((m) => m.SioAuthProfilePageModule),
      canActivate: [SioAuthGuard],
  },
  {
    path: 'auth/403',
    loadChildren: () =>
      import('./pages/403').then((m) => m.SioAuth403PageModule),
  },
];
