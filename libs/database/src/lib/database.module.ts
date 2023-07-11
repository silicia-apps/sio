import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SioCommonModule } from '@sio/core';

import { InlineLoaderFactory } from '@sio/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SioCommonModule,
    NgxsModule.forFeature([]),
  ],
  exports: [],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'database',
        //loader: InlineLoaderFactory(
        //  (lang: string) => import(`./i18n/${lang}.json`).then((a) => { console.log('logged'); return a}).catch((e) => { console.error(`./i18n/${lang}.json not found`);return {}})
        //)
      },
      multi: true,
    },
  ]
})
export class SioDatabaseModule {}

