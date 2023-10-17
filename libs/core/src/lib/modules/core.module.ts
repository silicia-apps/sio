import {
  ErrorHandler,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader, TranslateParser } from '@ngx-translate/core';
import { NgxTranslateDebugParser } from 'ngx-translate-debug';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { sioCoreStates } from '../store';

/* ngxs */
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  SioCoreEnvironmentConfig,
  SioCoreEnvironmentInterface,
} from '../services';

import { SioCoreErrorHandlerService } from '../shared/error.handle';
import { LoggerModule } from '@angular-ru/cdk/logger';

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: NgModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`,
      );
    }
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      'defaultLanguage': 'it',
      'loader': {
        'provide': TranslateLoader,
        'useFactory': createTranslateLoader, 
        'deps': [HttpClient],
      },
      'parser': { provide: TranslateParser, useClass: NgxTranslateDebugParser },
    }),
    LoggerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot(sioCoreStates, {
      developmentMode: true,
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsDataPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  exports: [ TranslateModule ],
})
export class SioCoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: SioCoreModule) {
    super(parentModule);
  }

  static forRoot(
    config?: SioCoreEnvironmentInterface,
  ): ModuleWithProviders<SioCoreModule> {
    return {
      ngModule: SioCoreModule,
      providers: [
        { provide: SioCoreEnvironmentConfig, useValue: config },
        { provide: ErrorHandler, useClass: SioCoreErrorHandlerService },
      ],
    };
  }
}
