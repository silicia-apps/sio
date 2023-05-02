import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { SioCommonModule } from '@sio/core';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SioCommonModule.forChild('home'), HomePageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
