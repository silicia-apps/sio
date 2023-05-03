import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPage } from './public.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPageRoutingModule {}
