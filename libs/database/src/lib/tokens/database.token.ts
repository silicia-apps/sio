import { InjectionToken } from '@angular/core';
import { SioDatabaseServiceInterface } from '../services';

export const SioDatabaseToken: InjectionToken<SioDatabaseServiceInterface> =
  new InjectionToken('__DATABASE_TOKEN__');
