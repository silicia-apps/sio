import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SioCommonModule } from '@silicia/core';

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
    RouterModule.forChild(routes),
  ],
  declarations: [SioChatPage],
})
export class SioChatPageModule { }