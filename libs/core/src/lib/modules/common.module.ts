import {
  ModuleWithProviders,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* ngxs */
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { SioCoreComponents } from '../components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { createTranslateLoader } from './core.module';

export function create2TranslateLoader(http: HttpClient) {
  console.log('pippo load');
  return new TranslateHttpLoader(http);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...SioCoreComponents],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(
      {
        'extend' : true,
        'loader': {
          'provide': TranslateLoader,
          'useFactory': createTranslateLoader, 
          'deps': [HttpClient],
        },
      } 
    ),
    NgxsFormPluginModule,
  ],
  exports: [...SioCoreComponents, IonicModule, TranslateModule ],
})
export class SioCommonModule {
  static forChild(
    scope = ''
  ): ModuleWithProviders<SioCommonModule> {
    return {
      ngModule: SioCommonModule,
      providers: [
        
      ],
    };
  }
}
