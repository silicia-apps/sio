import { InjectionToken } from '@angular/core';
import { SioDatabasePluginServiceInterface } from '../interfaces';

export const SioDatabasePluginServiceToken: InjectionToken<SioDatabasePluginServiceInterface> =
  new InjectionToken('__DATABASE_PLUGIN_SERVICE_TOKEN__');
