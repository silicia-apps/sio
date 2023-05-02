import { ModuleWithProviders } from "@angular/core";
import { SioCoreAppCompomentInterface } from '../../components/app';
import { SioCorePluginServiceConfigModel } from "../plugins";

export interface SioCoreEnvironmentInterface {
  logLevel: number,
  backend : SioCorePluginServiceConfigModel,
  language: {
    default: string,
    fallback: string,
    avaibles: string[],
  }
  production: boolean,
  plugins?: ModuleWithProviders<unknown>[],
  app: SioCoreAppCompomentInterface,
}
