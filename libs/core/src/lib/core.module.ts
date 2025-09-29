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

/**
 * Guard che previene il caricamento multiplo del modulo core.
 *
 * Questo costruttore viene chiamato dalle classi che estendono
 * `EnsureModuleLoadedOnceGuard` (es. `SioCoreModule`) e lancia un errore
 * se il modulo è già stato istanziato in un'altra parte dell'applicazione.
 *
 * Motivazione: alcuni provider devono essere singletons nell'app principale
 * (ad es. store NGXS, Logger). Importare il modulo core più volte può
 * causare comportamenti inaspettati.
 */
export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: NgModule) {
    // Se è presente un modulo genitore significa che il modulo è già stato
    // importato altrove: lanciamo un errore per guidare lo sviluppatore.
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`,
      );
    }
  }
}

import { SioCoreIconComponent} from './components'

/**
 * Factory per il loader delle traduzioni usato da ngx-translate.
 *
 * Viene fornito al `TranslateModule` e utilizza `HttpClient` per caricare
 * i file JSON di traduzione.
 *
 * @param http HttpClient iniettato dal DI di Angular
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...SioCoreComponents],
  exports: [...SioCoreComponents, SioCoreIconComponent, IonicModule, TranslateModule],
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
    SioCoreIconComponent,
    NgxsFormPluginModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
/**
 * Modulo che espone i componenti SIO comuni da usare all'interno dei
 * moduli lazy-loaded dell'applicazione.
 *
 * Importare `SioCommonModule` all'interno dei feature modules per avere
 * accesso a componenti, pipe e servizi non singleton ma riutilizzabili.
 */
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
