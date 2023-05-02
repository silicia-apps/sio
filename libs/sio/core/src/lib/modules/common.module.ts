import {
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

/* ngxs */
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { InlineLoaderFactory } from '../shared/shared.helpers';

// Translate Module
import {
  TranslocoModule,
  //TranslocoPipe,
  TRANSLOCO_SCOPE,
 // Translation,
} from '@ngneat/transloco';

import { SioCoreComponents } from '../components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [...SioCoreComponents],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    TranslocoModule,
    NgxsFormPluginModule,
  ],
  exports: [...SioCoreComponents, TranslocoModule, IonicModule ],
})
export class SioCommonModule {
  static forChild(
    scope: string = ''
  ): ModuleWithProviders<SioCommonModule> {
    return {
      ngModule: SioCommonModule,
      providers: [
        {
          provide: TRANSLOCO_SCOPE,
          useValue: {
            scope: scope,
            loader: InlineLoaderFactory(
              (lang: string) => import(`./i18n/${lang}.json`).then((a) => { console.log('logged'); return a}).catch((e) => { console.error(`./i18n/${lang}.json not found`);return {}})
            )
          },
          multi: true,
        },
      ],
    };
  }
}
