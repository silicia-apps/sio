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
  public subscribeEvents(): Observable<any> {
    return this.plugins[0].subscribeEvents();
  }

  public async upload(
    bucketId: string,
    document: SioStorageFileInterface,
    fileId?: string,
  ): Promise<boolean> {
    try {
      return this.plugins[0].upload(bucketId, document, fileId);
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

  public async delete(bucket: string, fileId: string): Promise<boolean> {
    try {
      this.sioCoreLoggerService.info('[SioStorageService][delete] try to delete file '+fileId);
      return this.plugins[0].delete(bucket, fileId);
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

  public async list(
    bucketId: string,
    queries?: string[],
    search?: string,
  ): Promise<SioStorageFileListInterface | undefined> {
    try {
      this.sioCoreLoggerService.debug(
      `[sioStorageService][List] execute plugins`,
      );
      return (await this.plugins[0].list(bucketId, queries, search));
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
