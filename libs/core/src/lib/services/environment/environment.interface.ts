import { ModuleWithProviders } from "@angular/core";
import { SioCoreAppCompomentInterface } from '../../interfaces';
import { SioCorePluginServiceConfigModel } from "../plugins";

export interface SioCoreEnvironmentInterface {
  logLevel: number,
  backend : SioCorePluginServiceConfigModel,
  production: boolean,
  plugins?: ModuleWithProviders<unknown>[],
  app: SioCoreAppCompomentInterface,
}
