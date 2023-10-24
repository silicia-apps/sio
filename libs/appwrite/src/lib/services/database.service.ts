import { Injectable, Inject } from '@angular/core';
import { Client, Databases } from 'appwrite';

import { SioDatabasePluginServiceInterface } from '@silicia/database';

import {
  Loggable,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
} from '@silicia/core';
import { SioAppwriteClientService } from './client.service';

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
    query: [],
    collection: string,
    database?: string | undefined
  ): Promise<boolean | []> {
    try {
      const items = await this.databases.listDocuments(database as string, collection,query);
      console.log(JSON.stringify(items));
      this.databases.client.subscribe("*", (value) => {
        console.error(value);
      })
      return [];
    } catch (e) { console.log(e); }
    return [];
  }

  async Delete(id: string, collection: string, database?: string | undefined): Promise<boolean> {
    try {
      const items = await this.databases.deleteDocument(database as string,collection, id);
      console.log(JSON.stringify(items));
      return true;
    } catch (e) { console.log(e); }
    return false;
  }
}
