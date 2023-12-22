import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SioAppwriteUserService } from '../services/user.service';

import {
  SioAuthPluginServiceConfigInterface,
  SioAuthPluginServiceConfigToken,
  SioAuthPluginServiceToken,
} from '@silicia/auth';

import { SioCoreLoggerService } from '@silicia/core';
import { SioAppwriteClientService } from '../services/client.service';

export function appwriteUserFactory(
  config: SioAuthPluginServiceConfigInterface,
  sioCoreLoggerService: SioCoreLoggerService,
  sioAppwriteClientService: SioAppwriteClientService,
): SioAppwriteUserService {
  return new SioAppwriteUserService(config, sioCoreLoggerService, sioAppwriteClientService);
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
          deps: [SioAuthPluginServiceConfigToken, SioCoreLoggerService, SioAppwriteClientService],
          multi: true,
        },
        SioAppwriteClientService,
      ],
    };
  }
}
