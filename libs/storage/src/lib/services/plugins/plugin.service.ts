import { Inject, Injectable, Optional } from '@angular/core';
import { Loggable, SioCoreAppComponentState } from '@silicia/core';
import { SioStoragePluginServiceInterface } from './interfaces';
import { SioStoragePluginServiceToken } from './tokens';
import { TranslateService } from '@ngx-translate/core';

@Loggable()
@Injectable({ providedIn: 'root' })
export class SioStoragePluginService
  implements SioStoragePluginServiceInterface
{
  private readonly plugins: SioStoragePluginServiceInterface[];

  constructor(
    @Optional()
    @Inject(SioStoragePluginServiceToken)
    plugins: SioStoragePluginServiceInterface[],
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private translateService: TranslateService,
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
  }

  async Upload(
    bucket: string,
    file: string,
    document: File[],
  ): Promise<boolean> {
    try {
      return this.plugins[0].Upload(bucket, file, document);
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

  async Delete(bucket: string, file: string): Promise<boolean> {
    try {
      return this.plugins[0].Delete(bucket, file);
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
}
