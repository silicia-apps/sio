import { InjectionToken } from '@angular/core';
import { SioStoragePluginServiceInterface } from '../interfaces';

export const SioStoragePluginServiceToken: InjectionToken<SioStoragePluginServiceInterface> =
  new InjectionToken('__STORAGE_PLUGIN_SERVICE_TOKEN__');
