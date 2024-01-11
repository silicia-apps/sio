import { Inject, Injectable, Optional } from '@angular/core';
import { SioStorageServiceInterface } from './interfaces';
import { SioStorageServiceToken } from './tokens';
import { TranslateService } from '@ngx-translate/core';
import { SioStorageFileInterface, SioStorageFileListInterface } from '../../interfaces';
import { SioCoreAppComponentState, SioCoreLoggerService } from '@silicia/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SioStorageService implements SioStorageServiceInterface {
  private readonly plugins: SioStorageServiceInterface[];

  constructor(
    @Optional()
    @Inject(SioStorageServiceToken)
    plugins: SioStorageServiceInterface[],
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private sioCoreLoggerService: SioCoreLoggerService,
    private translateService: TranslateService,
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SubscribeEvents(): Observable<any> {
    return this.plugins[0].SubscribeEvents();
  }

  async Upload(
    bucketId: string,
    document: SioStorageFileInterface,
    fileId?: string,
  ): Promise<boolean> {
    try {
      return this.plugins[0].Upload(bucketId, document, fileId);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'STORAGE_ERROR',
        );
    }
    return false;
  }

  async Delete(fileId: string, bucket: string): Promise<boolean> {
    try {
      return this.plugins[0].Delete(bucket, fileId);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'STORAGE_ERROR',
        );
    }
    return false;
  }

  async List(
    bucketId: string,
    queries?: string[],
    search?: string,
  ): Promise<SioStorageFileListInterface | undefined> {
    try {
      this.sioCoreLoggerService.debug(
      `[sioStorageService][List] execute plugins`,
      );
      return (await this.plugins[0].List(bucketId, queries, search));
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'STORAGE_ERROR',
        );
    }
    return undefined;
  }
}
