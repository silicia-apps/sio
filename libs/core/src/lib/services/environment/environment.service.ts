import { Injectable, Optional } from '@angular/core';
import { SioCoreEnvironmentInterface } from './environment.interface';
//import { SioCoreLoggerService } from '../logger';
import { LogLevel } from '../../shared/shared.enum';
import { SioCoreAppCompomentInterface } from '../../components/app';

export class SioCoreEnvironmentConfig implements SioCoreEnvironmentInterface {
  production = false;
  logLevel = LogLevel.Info;
  backend = {};
  language = {
    default: 'en',
    fallback: 'en',
    avaibles: ['it', 'en'],
  };
  app: SioCoreAppCompomentInterface = {
    title: 'TEST',
    sidemenu: 'overlay',
    //dark: false,
    menu: {},
    urls: { login: '/auth/login', redirectTo: '/' },
  };
}

@Injectable({
  providedIn: 'root',
})
export class SioCoreEnvironmentService {
  private _config!: SioCoreEnvironmentInterface;
  constructor(
    //private sioLoggerService: SioCoreLoggerService,
    @Optional() config?: SioCoreEnvironmentConfig) {
    if (config) {
      this._config = config;
    }
  }
  get config(): SioCoreEnvironmentInterface {
    return this._config;
  }
}
