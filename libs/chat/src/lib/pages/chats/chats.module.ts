import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SioCommonModule } from '@silicia/core';

import { Routes, RouterModule } from '@angular/router';
import { SioChatsPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: SioChatsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SioCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SioChatsPage],
})
export class SioChatsPageModule {}