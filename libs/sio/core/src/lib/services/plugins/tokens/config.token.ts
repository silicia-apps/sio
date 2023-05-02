import { InjectionToken } from '@angular/core';
import { SioCorePluginServiceConfigModel } from '../interfaces';

export const sioCorePluginServiceConfigToken: InjectionToken<SioCorePluginServiceConfigModel> =
  new InjectionToken('__PLUGIN_SERVICE_CONFIG_TOKEN__');
