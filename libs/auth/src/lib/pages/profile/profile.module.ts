import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SioCommonModule } from '@silicia/core';
import { SioAuthProfilePageComponent } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: SioAuthProfilePageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SioCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SioAuthProfilePageComponent],
})
export class SioAuthProfilePageModule {}
