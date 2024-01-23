import { Injectable, Inject } from '@angular/core';
import { Databases, ID } from 'appwrite';

import {
  SioDatabaseServiceInterface,
  SioDatabaseDocumentInterface,
  SioDatabaseDocumentListInterface,
} from '@silicia/database';

import {
  Loggable,
  SioCoreDocumentInterface,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
} from '@silicia/core';
import { SioAppwriteClientService } from './client.service';
import { Observable } from 'rxjs';

@Loggable()
@Injectable()
export class SioAppwriteDatabaseService implements SioDatabaseServiceInterface {
  private readonly databases: Databases;

  // constructor(@Inject(siliciaCoreBackendPluginConfigToken) readonly config: SiliciaCoreBackendPluginConfigInterface) {
  constructor(
    @Inject(sioCorePluginServiceConfigToken)
    readonly config: SioCorePluginServiceConfigModel,
    @Inject(SioCoreLoggerService)
    private loggerService: SioCoreLoggerService,
    private sioAppwriteClientService: SioAppwriteClientService,
  ) {
    this.sioAppwriteClientService.Connect(
      this.config.apiEndpoint as string,
      this.config.projectID as string,
    );
    this.databases = new Databases(this.sioAppwriteClientService.client);
  }

  async add(
    value: SioCoreDocumentInterface,
    collectionId?: string,
    databaseId?: string,
    documentId?: string,
  ): Promise<boolean> {
    try {
      if (!documentId) documentId = ID.unique();
      const product = await this.databases.createDocument(
        databaseId as string,
        collectionId as string,
        documentId as string,
        value,
      );
      console.error(JSON.stringify(product));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  async get(
    id: string,
    collection: string,
    database?: string | undefined,
  ): Promise<boolean> {
    try {
      const product = await this.databases.getDocument(
        database as string,
        collection,
        id,
      );
      console.error(JSON.stringify(product));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async set(
    id: string,
    data: SioDatabaseDocumentInterface,
    collectionId: string,
    databaseId: string | undefined,
  ): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { $collectionId, $databaseId, $createdAt, $permissions, $id, $updatedAt, ...newData } = data;
      const document = await this.databases.updateDocument(
        databaseId as string,
        collectionId,
        id,
        newData,
      );
      console.error(JSON.stringify(document));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async query(
    database: string,
    collection: string,
    queries: string[] | undefined = undefined,
  ): Promise<SioDatabaseDocumentListInterface<SioDatabaseDocumentInterface>> {
    try {
      return await this.databases.listDocuments(database, collection, queries);
    } catch (e) {
      throw e as Error;
    }
  }

  async delete(
    documentId: string | number,
    collectionId?: string,
    databaseId?: string,
  ): Promise<boolean> {
    try {
      console.log('try to delete '+documentId);
      const items = await this.databases.deleteDocument(
        databaseId as string,
        collectionId as string,
        documentId as string,
      );
      console.log(JSON.stringify(items));
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(): Observable<any> {
    return new Observable((observer) => {
      this.sioAppwriteClientService.client.subscribe('documents', (data) => {
        observer.next(data);
      });
    });
  }
}
