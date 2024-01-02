import { InjectionToken } from '@angular/core';
import { SioStoragePluginServiceConfigInterface } from '../interfaces';

export const SioStoragePluginServiceConfigToken: InjectionToken<SioStoragePluginServiceConfigInterface> =
  new InjectionToken('__STORAGE_PLUGIN_SERVICE_CONFIG_TOKEN__');
