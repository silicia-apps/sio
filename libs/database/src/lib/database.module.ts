import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SioCommonModule } from '@silicia/core';
import { SioDatabaseListComponent } from './components';

@NgModule({
  declarations: [SioDatabaseListComponent],
  imports: [CommonModule, SioCommonModule, NgxsModule.forFeature([])],
  exports: [SioDatabaseListComponent],
  providers: [],
})
export class SioDatabaseModule {}
