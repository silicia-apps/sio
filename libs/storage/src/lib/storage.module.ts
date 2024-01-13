import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { SioStorageState } from './store/storage.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([SioStorageState]),
  ],
  exports: [],
  providers: []
})
export class SioStorageModule {}

