import { InjectionToken } from '@angular/core';
import { SioDatabaseConfigInterface } from '../interfaces';

export const SioDatabaseConfigToken: InjectionToken<SioDatabaseConfigInterface> =
  new InjectionToken('__DATABASE_CONFIG_TOKEN__');
