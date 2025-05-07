import { Injectable, Inject } from '@angular/core';
import { Storage, ID } from 'appwrite';

import {
  SioStorageServiceInterface,
  SioStorageFileInterface,
  SioStorageFileListInterface,
} from '@silicia/storage';

import {
  Loggable,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
} from '@silicia/core';

import { SioAppwriteClientService } from './client.service';
import { Observable } from 'rxjs';

@Loggable()
@Injectable()
export class SioAppwriteStorageService implements SioStorageServiceInterface {
  private readonly storage: Storage;

  constructor(
    @Inject(sioCorePluginServiceConfigToken)
    readonly config: SioCorePluginServiceConfigModel,
    @Inject(SioCoreLoggerService)
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioAppwriteClientService: SioAppwriteClientService,
  ) {
    this.sioAppwriteClientService.Connect(
      this.config.apiEndpoint as string,
      this.config.projectID as string,
    );
    this.storage = new Storage(this.sioAppwriteClientService.client);
  }

  async upload(
    bucketId: string,
    document: SioStorageFileInterface,
    fileId?: string,
  ): Promise<boolean> {
    try {
      const blob = [];
      if (!fileId) fileId = ID.unique();
      if (document.data) blob.push(atob(document.data));
      await this.storage.createFile(
        bucketId as string,
        fileId as string,
        new File(blob, document.name, {
          type: document.mimeType,
          lastModified: document.modifiedAt,
        }),
      );
      return true;
    } catch (e) {
      throw this.throwError(e as Error);
    }
  }

  async delete(bucketId: string, fileId: string): Promise<boolean> {
    try {
      await this.storage.deleteFile(bucketId, fileId);
      return true;
    } catch (e) {
      throw this.throwError(e as Error);
    }
  }

  async list(
    bucketId: string,
    query?: string[],
    search?: string,
  ): Promise<SioStorageFileListInterface | undefined> {
    try {
      this.sioCoreLoggerService.debug(`[SioAppwriteStorageService][List]`);
      return await this.storage.listFiles(bucketId, query, search);
    } catch (e) {
      this.sioCoreLoggerService.error(
        `[SioAppwriteStorageService][List]`,
        e as Error,
      );
      return undefined;
    }
  }

  subscribeEvents(): Observable<any> {
    return new Observable((observer) => {
      this.sioAppwriteClientService.client.subscribe('files', (data) => {
        observer.next(data);
      });
    });
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
