import { InjectionToken } from '@angular/core';
import { SioAuthPluginServiceConfigInterface } from '../interfaces';

export const SioAuthPluginServiceConfigToken: InjectionToken<SioAuthPluginServiceConfigInterface> =
  new InjectionToken('__AUTH_PLUGIN_SERVICE_CONFIG_TOKEN__');
