import { NgModule } from '@angular/core';
import { SioAuthGuard } from '@sio/auth';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule), canActivate: [SioAuthGuard],
      data: { level: 0 },
  },
  {
    path: 'one',
    loadChildren: () =>
      import('./one/one.module').then((m) => m.OnePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
