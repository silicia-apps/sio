import {
  ErrorHandler,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { IonicModule } from '@ionic/angular';

import { sioCoreStates } from '../store';

/* ngxs */
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLOCO_CONFIG, TRANSLOCO_SCOPE, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { SioCoreEnvironmentConfig, SioCoreEnvironmentInterface } from '../services';

import { SioCoreErrorHandlerService } from '../shared/error.handle';
import { InlineLoaderFactory, httpLoader } from '../shared/shared.helpers';
import { LoggerModule } from '@angular-ru/cdk/logger';

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: NgModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}

@NgModule({
  imports: [ 
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot(),
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot(sioCoreStates, {
      developmentMode: true,
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    /*NgxsLoggerPluginModule.forRoot({
      collapsed: true,
    }),*/
    NgxsDataPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
})
export class SioCoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: SioCoreModule) {
    super(parentModule);
  }

  static forRoot(
    config?: SioCoreEnvironmentInterface
  ): ModuleWithProviders<SioCoreModule> {
    return {
      ngModule: SioCoreModule,
      providers: [
        { provide: SioCoreEnvironmentConfig, useValue: config },
        {
          provide: TRANSLOCO_CONFIG,
          useValue: {
            reRenderOnLangChange: true,
            availableLangs: config?.language?.avaibles || 'en',
            defaultLang: config?.language?.default || 'en',
            fallbackLang: config?.language?.fallback || 'en',
            prodMode: config?.production,
            flatten: {
              aot: config?.production,
            },
          } as TranslocoConfig,
        },
        httpLoader,
        /*{
          provide: TRANSLOCO_SCOPE,
          useValue: {
            scope: '',
            loader: InlineLoaderFactory(
              (lang: string) => import(`../i18n/global/${lang}.json`)
            ),
          },
          multi: true ,
        },*/ 
       //{ provide: ErrorHandler, useClass: SioCoreErrorHandlerService }, 
      ],
    };
  }
} 