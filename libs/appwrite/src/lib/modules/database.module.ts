import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SioAppwriteDatabaseService } from '../services/database.service';

import {
  SioDatabaseConfigInterface,
  SioDatabaseConfigToken,
  SioDatabaseToken,
} from '@silicia/database';

import { SioCoreLoggerService } from '@silicia/core';
import { SioAppwriteClientService } from '../services/client.service';

export function appwriteDatabaseFactory(
  config: SioDatabaseConfigInterface,
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
    config: SioDatabaseConfigInterface
  ): ModuleWithProviders<AppwriteDatabaseModule> {
    return {
      ngModule: AppwriteDatabaseModule,
      providers: [
        { provide: SioDatabaseConfigToken, useValue: config },
        {
          provide: SioDatabaseToken,
          useFactory: appwriteDatabaseFactory,
          deps: [SioDatabaseConfigToken, SioCoreLoggerService, SioAppwriteClientService],
          multi: true,
        },
      ]
    };
  }
}
