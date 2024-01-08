import { Inject, Injectable, Optional } from '@angular/core';
import { Loggable, SioCoreAppComponentState, SioCoreDocumentInterface, SioCoreDocumentsInterface } from '@silicia/core';
import { SioDatabasePluginServiceInterface } from './interfaces';
import { SioDatabasePluginServiceToken } from './tokens';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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
    private translateService: TranslateService
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
          error.message,
          'DATABASE_ERROR'
        );
    }
    return false;
  }

  socket(channels: string | string[]): Observable<string[]> {
    return this.plugins[0].socket(channels);
  }

  async List(
    collection: string,
    query: string[] | undefined,
    database: string | undefined 
  ): Promise<SioCoreDocumentsInterface<SioCoreDocumentInterface>> {
    try {
      return this.plugins[0].List(collection, query, database);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'DATABASE_ERROR'
        );
      throw error;
    }
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
          error.message,
          'DATABASE_ERROR'
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
          error.message,
          'DATABASE_ERROR'
        );
    }
    return false;
  }
}
