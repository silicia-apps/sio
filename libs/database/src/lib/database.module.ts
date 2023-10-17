import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SioCommonModule } from '@sio/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SioCommonModule,
    NgxsModule.forFeature([]),
  ],
  exports: [],
  providers: []
})
export class SioDatabaseModule {}

