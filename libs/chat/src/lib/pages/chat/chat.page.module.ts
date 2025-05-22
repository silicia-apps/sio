import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SioCommonModule } from '@silicia/core';
import { SioChatComponents } from '../../components';

import { Routes, RouterModule } from '@angular/router';
import { SioChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: SioChatPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SioCommonModule,
    SioChatPage,
    SioChatComponents,
    RouterModule.forChild(routes),
  ],
  declarations: [],
})
export class SioChatPageModule { }