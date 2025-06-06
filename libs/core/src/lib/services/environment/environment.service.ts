import { Injectable, Optional } from '@angular/core';
import { SioCoreEnvironmentInterface } from './environment.interface';
//import { SioCoreLoggerService } from '../logger';
import { LogLevel } from '../../shared/shared.enum';
import { SioCoreAppCompomentInterface } from '../../interfaces';

export class SioCoreEnvironmentConfig implements SioCoreEnvironmentInterface {
  production = false;
  logLevel = LogLevel.Info;
  backend = {};
  other = {};

  app: SioCoreAppCompomentInterface = {
    title: 'APP_TITLE',
    language: {
      default: 'en',
      fallback: 'en',
      avaibles: ['it', 'en'],
    },
    layout: {
      left_panel: {
        menu: undefined,
        type: 'none',
      },
      right_panel: {
        menu: undefined,
        type: 'none',
      },
      tab: {
        desktop: 'none',
        mobile: 'none',
        menu: undefined,
      },
      dark: false,
      split: false,
    },
    routes: { login: '/auth/login', redirectTo: '/' },
  };
}

@Injectable({
  providedIn: 'root',
})
export class SioCoreEnvironmentService {
  private _config!: SioCoreEnvironmentInterface;
  constructor(
    //private sioLoggerService: SioCoreLoggerService,
    @Optional() config?: SioCoreEnvironmentConfig,
  ) {
    if (config) {
      this._config = config;
    }
  }
  get config(): SioCoreEnvironmentInterface {
    return this._config;
  }
}
