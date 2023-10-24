import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SioCommonModule } from '@silicia/core';

import { Routes, RouterModule } from '@angular/router';
import { SioAuthLoginPage } from './login.page';
import { SioAuthModule } from '../../../index';

const routes: Routes = [
  {
    path: '',
    component: SioAuthLoginPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SioCommonModule.forChild(),
    SioAuthModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SioAuthLoginPage],
})
export class SioAuthLoginPageModule {}
