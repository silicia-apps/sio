import { InjectionToken } from '@angular/core';
import { SioStorageServiceInterface } from '../interfaces';

export const SioStorageServiceToken: InjectionToken<SioStorageServiceInterface> =
  new InjectionToken('__STORAGE_SERVICE_TOKEN__');
