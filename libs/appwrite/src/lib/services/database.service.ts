import { Injectable, Inject } from '@angular/core';
import { Databases } from 'appwrite';

import { SioDatabasePluginServiceInterface } from '@silicia/database';

import {
  Loggable,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
  SioCoreDocumentInterface,
  SioCoreDocumentsInterface,
} from '@silicia/core';
import { SioAppwriteClientService } from './client.service';
import { Observable } from 'rxjs';

@Loggable()
@Injectable()
export class SioAppwriteDatabaseService
  implements SioDatabasePluginServiceInterface
{
  private readonly databases: Databases;

  // constructor(@Inject(siliciaCoreBackendPluginConfigToken) readonly config: SiliciaCoreBackendPluginConfigInterface) {
  constructor(
    @Inject(sioCorePluginServiceConfigToken)
    readonly config: SioCorePluginServiceConfigModel,
    @Inject(SioCoreLoggerService)
    private loggerService: SioCoreLoggerService,
    private sioAppwriteClientService: SioAppwriteClientService,
  ) {
    this.sioAppwriteClientService.Connect(this.config.apiEndpoint as string, this.config.projectID as string);
    this.databases = new Databases(this.sioAppwriteClientService.client);
  }

  async Create(value: object, collection: string, database?: string | undefined, document?: string | undefined): Promise<boolean> {
    try {
      const product = await this.databases.createDocument(
        database as string, collection, document as string, value
      );
      console.error(JSON.stringify(product));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;  
  }
  async Get(
    id: string,
    collection: string,
    database?: string | undefined
  ): Promise<boolean> {
    try {
      const product = await this.databases.getDocument(
        database as string,
        collection,
        id
      );
      console.error(JSON.stringify(product));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async List(
    collection: string,
    query: string[] | undefined = undefined,
    database: string | undefined = undefined
  ): Promise<SioCoreDocumentsInterface<SioCoreDocumentInterface>> {
    try {
      return await this.databases.listDocuments(database!, collection, query);
    } catch (e) { throw e as Error; }
  }

  async Delete(id: string, collection: string, database?: string | undefined): Promise<boolean> {
    try {
      const items = await this.databases.deleteDocument(database as string,collection, id);
      console.log(JSON.stringify(items));
      return true;
    } catch (e) { console.log(e); }
    return false;
  }

  socket(channels: string | string[]): Observable<string[]> {
    return new Observable((observer) => {
      this.sioAppwriteClientService.client.subscribe('databases.' + channels, (data) => {
        this.loggerService.debug(
          `[SioDatabasesService][socket] Detected Database changes`,
          data
        );
        observer.next(data.events);
      });
    });
      
  }
}
