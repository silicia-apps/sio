import { Inject, Injectable, Optional } from '@angular/core';
import { Loggable, SioCoreAppComponentState } from '@sio/core';
import { SioDatabasePluginServiceInterface } from './interfaces';
import { SioDatabasePluginServiceToken } from './tokens';
import { TranslocoService } from '@ngneat/transloco';

@Loggable()
@Injectable({ providedIn: 'root' })
export class SioDatabasePluginService
  implements SioDatabasePluginServiceInterface
{
  private readonly plugins: SioDatabasePluginServiceInterface[];

  constructor(
    @Optional()
    @Inject(SioDatabasePluginServiceToken)
    plugins: SioDatabasePluginServiceInterface[],
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private translocoService: TranslocoService
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
  }

  async Create(
    value: object,
    collection: string,
    database?: string,
    document?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].Create(value, collection, database, document);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          this.translocoService.translate(error.message),
          this.translocoService.translate('DATABASE_ERROR')
        );
    }
    return false;
  }

  async List(
    query: Array<any>,
    collection: string,
    database?: string 
  ): Promise<Array<any> | boolean> {
    try {
      return this.plugins[0].List(query, collection, database);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          this.translocoService.translate(error.message),
          this.translocoService.translate('DATABASE_ERROR')
        );
    }
    return false;
  }

  async Get(
    id: string,
    collection: string,
    database?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].Get(id, collection, database);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          this.translocoService.translate(error.message),
          this.translocoService.translate('DATABASE_ERROR')
        );
    }
    return false;
  }
  async Delete(
    id: string,
    collection: string,
    database?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].Delete(id, collection, database);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          this.translocoService.translate(error.message),
          this.translocoService.translate('DATABASE_ERROR')
        );
    }
    return false;
  }
}
