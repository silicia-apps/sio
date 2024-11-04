import { Inject, Injectable, Optional } from "@angular/core";
import { Loggable, SioCoreAppComponentState } from "@silicia/core";
import { SioDatabaseServiceInterface } from "./interfaces";
import {
  SioDatabaseDocumentInterface,
  SioDatabaseDocumentListInterface,
} from "../../interfaces";
import { SioDatabaseToken } from "../../tokens";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
@Loggable()
@Injectable({ providedIn: "root" })
export class SioDatabaseService implements SioDatabaseServiceInterface {
  private readonly plugins: SioDatabaseServiceInterface[];

  constructor(
    @Optional()
    @Inject(SioDatabaseToken)
    plugins: SioDatabaseServiceInterface[],
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private translateService: TranslateService
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
  }

  async add(
    value: SioDatabaseDocumentInterface,
    collectionId?: string,
    databaseId?: string,
    documentId?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].add(value, collectionId, databaseId, documentId);
    } catch (e) {
      const error = e as Error;
      if (error.name === "sio-error")
        this.sioCoreAppComponentState.throwError(
          error.message,
          "DATABASE_ERROR"
        );
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(): Observable<any> {
    return this.plugins[0].subscribe();
  }

  async query(
    databaseId: string,
    collectionId: string,
    queries: string[] | undefined
  ): Promise<SioDatabaseDocumentListInterface<SioDatabaseDocumentInterface>> {
    try {
      return this.plugins[0].query(databaseId, collectionId, queries);
    } catch (e) {
      const error = e as Error;
      if (error.name === "sio-error")
        this.sioCoreAppComponentState.throwError(
          error.message,
          "DATABASE_ERROR"
        );
      throw error;
    }
  }

  async get(
    id: string,
    collection: string,
    database?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].get(id, collection, database);
    } catch (e) {
      const error = e as Error;
      if (error.name === "sio-error")
        this.sioCoreAppComponentState.throwError(
          error.message,
          "DATABASE_ERROR"
        );
    }
    return false;
  }

  async set(
    id: string,
    data: SioDatabaseDocumentInterface,
    collectionId: string,
    databaseId: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].set(id, data, collectionId, databaseId);
    } catch (e) {
      const error = e as Error;
      if (error.name === "sio-error")
        this.sioCoreAppComponentState.throwError(
          error.message,
          "DATABASE_ERROR"
        );
    }
    return false;
  }

  async delete(
    documentId: string | number,
    collectionId?: string,
    databaseId?: string
  ): Promise<boolean> {
    try {
      return this.plugins[0].delete(documentId, collectionId, databaseId);
    } catch (e) {
      const error = e as Error;
      if (error.name === "sio-error")
        this.sioCoreAppComponentState.throwError(
          error.message,
          "DATABASE_ERROR"
        );
    }
    return false;
  }
}
