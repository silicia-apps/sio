import { InjectionToken } from '@angular/core';
import { SioAuthPluginServiceInterface } from '../interfaces';

export const SioAuthPluginServiceToken: InjectionToken<SioAuthPluginServiceInterface> =
  new InjectionToken('__AUTH_PLUGIN_SERVICE_TOKEN__');
