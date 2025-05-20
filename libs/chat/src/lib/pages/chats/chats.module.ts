import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SioCommonModule } from '@silicia/core';

import { Routes, RouterModule } from '@angular/router';
import { SioChatListPage } from './chat-list.page';

const routes: Routes = [
  {
    path: '',
    component: SioChatListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SioCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SioChatListPage],
})
export class SioChatListPageModule {}