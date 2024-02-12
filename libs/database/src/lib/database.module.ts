import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SioCommonModule } from '@silicia/core';
import { SioListDataDirective } from './directives/list-data.directives'

@NgModule({
  declarations: [SioListDataDirective],
  imports: [
    CommonModule,
    SioCommonModule,
    NgxsModule.forFeature([]),
  ],
  exports: [SioListDataDirective],
  providers: []
})
export class SioDatabaseModule {}

