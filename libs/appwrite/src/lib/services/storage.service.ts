import { Injectable, Inject } from '@angular/core';
import { Storage } from 'appwrite';

import { SioStoragePluginServiceInterface, sioStorageFileInterface } from '@silicia/storage';

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

  async Upload(bucket: string, file: string, document: sioStorageFileInterface): Promise<boolean> {
    try {
      const blob = [];
      if (document.data) blob.push(atob(document.data));
      await this.storage.createFile(
        bucket as string, file as string, new File(blob, document.name, { 'type': document.mimeType, 'lastModified': document.modifiedAt })
      );
      return true;
    } catch (e) {
      throw this.throwError(e as Error);
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
      throw this.throwError(e as Error);
    }
    return false;  
  }

  private throwError(e: Error): Error {
    const error = new Error();
    switch (e.message) {
      case 'A storage file with the requested ID already exists.':
        error.message = 'BACKEND_STORAGE_FILE_ALREADY_EXISTS';
        break;
      default:
        error.message = e.message;
    }
    error.name = 'sio-error';
    return error;
  }
}