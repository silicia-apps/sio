import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PublicPage } from './public.page';

import { SioCommonModule } from '@sio/core';

import { PublicPageRoutingModule } from './public-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SioCommonModule.forChild('public'),
    PublicPageRoutingModule,
  ],
  declarations: [PublicPage],
})
export class PublicPageModule {}
