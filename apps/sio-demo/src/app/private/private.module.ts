import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PrivatePage } from './private.page';

import { SioCommonModule } from '@sio/core';

import { PrivatePageRoutingModule } from './private-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SioCommonModule.forChild('private'),
    PrivatePageRoutingModule,
  ],
  declarations: [PrivatePage],
})
export class PrivatePageModule {}
