import { Injectable, Inject } from '@angular/core';
import { Storage } from 'appwrite';

import { SioStoragePluginServiceInterface } from '@silicia/storage';

import {
  Loggable,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
} from '@silicia/core';
import { SioAppwriteClientService } from './client.service';

@Loggable()
@Injectable()
export class SioAppwriteStorageService
  implements SioStoragePluginServiceInterface
{
  private readonly storage: Storage;

  constructor(
    @Inject(sioCorePluginServiceConfigToken)
    readonly config: SioCorePluginServiceConfigModel,
    @Inject(SioCoreLoggerService)
    private loggerService: SioCoreLoggerService,
    private sioAppwriteClientService: SioAppwriteClientService,
  ) {
    this.sioAppwriteClientService.Connect(this.config.apiEndpoint as string, this.config.projectID as string);
    this.storage = new Storage(this.sioAppwriteClientService.client);
  }

  async Upload(bucket: string, file: string, document: File[]): Promise<boolean> {
    try {
      await this.storage.createFile(
        bucket as string, file as string, document[0]
      );
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;  
  }

  async Delete(bucket: string, file: string): Promise<boolean> {
    try {
      await this.storage.deleteFile(
        bucket as string, file as string
      );
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;  
  }
}