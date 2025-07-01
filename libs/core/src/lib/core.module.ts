import {
  CUSTOM_ELEMENTS_SCHEMA,
  // ErrorHandler,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { sioCoreStates } from './store';

/* ngxs */
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MaskitoModule } from '@maskito/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SioCoreComponents } from './components';

import {
  SioCoreEnvironmentConfig,
  SioCoreEnvironmentInterface,
} from './services';

//import { SioCoreErrorHandlerService } from "./shared/error.handle";
import { LoggerModule } from '@angular-ru/cdk/logger';
import { RouterModule } from '@angular/router';
import { RelativeTime } from './pipes';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...SioCoreComponents],
  exports: [...SioCoreComponents, IonicModule, TranslateModule],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    //MaskitoModule,
    ReactiveFormsModule,
    IonicModule,
    ScrollingModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxsFormPluginModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SioCommonModule {}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
  exports: [IonicModule, TranslateModule],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxsFormPluginModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SioMinimalModule {}

@NgModule({
  exports: [TranslateModule],
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    LoggerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot(sioCoreStates, {
      developmentMode: true,
      //executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsDataPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
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
        // { provide: ErrorHandler, useClass: SioCoreErrorHandlerService },
      ],
    };
  }
}
