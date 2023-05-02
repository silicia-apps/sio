import { NgModule } from '@angular/core';
import { SioCommonModule } from '@sio/core';
import { Routes, RouterModule } from '@angular/router';

import { SioAuth403Page } from './403.page';

const routes: Routes = [
  {
    path: '',
    component: SioAuth403Page,
  },
];

@NgModule({
  imports: [
    SioCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SioAuth403Page],
})
export class SioAuth403PageModule {}
