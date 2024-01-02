import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SioAppwriteStorageService } from '../services/storage.service';

import {
  SioStoragePluginServiceConfigInterface,
  SioStoragePluginServiceConfigToken,
  SioStoragePluginServiceToken,
} from '@silicia/storage';

import { SioCoreLoggerService } from '@silicia/core';
import { SioAppwriteClientService } from '../services/client.service';

export function appwriteStorageFactory(
  config: SioStoragePluginServiceConfigInterface,
  sioCoreLoggerService: SioCoreLoggerService,
  sioAppwriteClientService: SioAppwriteClientService,
): SioAppwriteStorageService {
  return new SioAppwriteStorageService(config, sioCoreLoggerService, sioAppwriteClientService);
}
@NgModule({})
export class AppwriteStorageModule {
  static forRoot(
    config: SioStoragePluginServiceConfigInterface
  ): ModuleWithProviders<AppwriteStorageModule> {
    return {
      ngModule: AppwriteStorageModule,
      providers: [
        { provide: SioStoragePluginServiceConfigToken, useValue: config },
        {
          provide: SioStoragePluginServiceToken,
          useFactory: appwriteStorageFactory,
          deps: [SioStoragePluginServiceConfigToken, SioCoreLoggerService, SioAppwriteClientService],
          multi: true,
        },
        SioAppwriteClientService,
      ],
    };
  }
}
