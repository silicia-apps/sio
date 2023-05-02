import { InjectionToken } from '@angular/core';
import { SioCorePluginServiceModel } from '../interfaces';

export const SioCorePluginServiceToken: InjectionToken<SioCorePluginServiceModel> =
  new InjectionToken('__PLUGIN_SERVICE_TOKEN__');
