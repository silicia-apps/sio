import { NgModule, ModuleWithProviders } from '@angular/core';
import { SioAppwriteStorageService } from '../services/storage.service';

import {
  SioStorageServiceConfigInterface,
  SioStorageServiceConfigToken,
  SioStorageServiceToken,
} from '@silicia/storage';

import { SioCoreLoggerService } from '@silicia/core';
import { SioAppwriteClientService } from '../services/client.service';

export function appwriteStorageFactory(
  config: SioStorageServiceConfigInterface,
  sioCoreLoggerService: SioCoreLoggerService,
  sioAppwriteClientService: SioAppwriteClientService,
): SioAppwriteStorageService {
  return new SioAppwriteStorageService(config, sioCoreLoggerService, sioAppwriteClientService);
}
@NgModule({})
export class AppwriteStorageModule {
  static forRoot(
    config: SioStorageServiceConfigInterface
  ): ModuleWithProviders<AppwriteStorageModule> {
    return {
      ngModule: AppwriteStorageModule,
      providers: [
        { provide: SioStorageServiceConfigToken, useValue: config },
        {
          provide: SioStorageServiceToken,
          useFactory: appwriteStorageFactory,
          deps: [SioStorageServiceConfigToken, SioCoreLoggerService, SioAppwriteClientService],
          multi: true,
        },
        SioAppwriteClientService,
      ],
    };
  }
}
