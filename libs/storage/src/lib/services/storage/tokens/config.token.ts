import { InjectionToken } from '@angular/core';
import { SioStorageServiceConfigInterface } from '../interfaces';

export const SioStorageServiceConfigToken: InjectionToken<SioStorageServiceConfigInterface> =
  new InjectionToken('__STORAGE_SERVICE_CONFIG_TOKEN__');
