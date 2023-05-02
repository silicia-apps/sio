import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SioAppwriteUserService } from '../services/user.service';

import {
  SioAuthPluginServiceConfigInterface,
  SioAuthPluginServiceConfigToken,
  SioAuthPluginServiceToken,
} from '@sio/auth';

import { SioCoreLoggerService } from '@sio/core';

export function appwriteUserFactory(
  config: SioAuthPluginServiceConfigInterface,
  sioCoreLoggerService: SioCoreLoggerService
): SioAppwriteUserService {
  return new SioAppwriteUserService(config, sioCoreLoggerService);
}
@NgModule({
  imports: [CommonModule],
})
export class AppwriteAuthModule {
  static forRoot(
    config: SioAuthPluginServiceConfigInterface
  ): ModuleWithProviders<AppwriteAuthModule> {
    return {
      ngModule: AppwriteAuthModule,
      providers: [
        { provide: SioAuthPluginServiceConfigToken, useValue: config },
        {
          provide: SioAuthPluginServiceToken,
          useFactory: appwriteUserFactory,
          deps: [SioAuthPluginServiceConfigToken, SioCoreLoggerService],
          multi: true,
        },
      ],
    };
  }
}
