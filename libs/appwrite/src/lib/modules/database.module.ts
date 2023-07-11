import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SioAppwriteDatabaseService } from '../services/database.service';

import {
  SioDatabasePluginServiceConfigInterface,
  SioDatabasePluginServiceConfigToken,
  SioDatabasePluginServiceToken,
} from '@sio/database';

import { SioCoreLoggerService } from '@sio/core';
import { SioAppwriteClientService } from '../services/client.service';

export function appwriteDatabaseFactory(
  config: SioDatabasePluginServiceConfigInterface,
  sioCoreLoggerService: SioCoreLoggerService,
  sioAppwriteClientService: SioAppwriteClientService,
): SioAppwriteDatabaseService {
  return new SioAppwriteDatabaseService(config, sioCoreLoggerService, sioAppwriteClientService);
}

@NgModule({
  imports: [CommonModule],
})
export class AppwriteDatabaseModule {
  static forRoot(
    config: SioDatabasePluginServiceConfigInterface
  ): ModuleWithProviders<AppwriteDatabaseModule> {
    return {
      ngModule: AppwriteDatabaseModule,
      providers: [
        { provide: SioDatabasePluginServiceConfigToken, useValue: config },
        {
          provide: SioDatabasePluginServiceToken,
          useFactory: appwriteDatabaseFactory,
          deps: [SioDatabasePluginServiceConfigToken, SioCoreLoggerService, SioAppwriteClientService],
          multi: true,
        },
      ],
    };
  }
}
