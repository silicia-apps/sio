import { InjectionToken } from '@angular/core';
import { SioDatabasePluginServiceConfigInterface } from '../interfaces';

export const SioDatabasePluginServiceConfigToken: InjectionToken<SioDatabasePluginServiceConfigInterface> =
  new InjectionToken('__DATABASE_PLUGIN_SERVICE_CONFIG_TOKEN__');
