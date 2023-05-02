import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnePage } from './one.page';

const routes: Routes = [
  {
    path: '',
    component: OnePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnePageRoutingModule {}
