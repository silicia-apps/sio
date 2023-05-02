import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OnePage } from './one.page';

import { SioCommonModule } from '@sio/core';

import { OnePageRoutingModule } from './one-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SioCommonModule.forChild('one'), OnePageRoutingModule],
  declarations: [OnePage],
})
export class OnePageModule {}
