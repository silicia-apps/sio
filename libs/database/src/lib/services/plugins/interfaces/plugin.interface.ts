import { SioCoreDocumentInterface, SioCoreDocumentsInterface } from "@silicia/core";
import { Observable } from "rxjs";

export interface SioDatabasePluginServiceInterface {
  Create(value: object, collection : string, database?: string, document?: string): Promise<boolean>;
  List(collection: string, query: string[] | undefined,  database: string | undefined): Promise<SioCoreDocumentsInterface<SioCoreDocumentInterface>>;
  Get(id: string, collection: string, database?: string): Promise<boolean>;
  Delete(id: string, collection: string, database?: string): Promise<boolean>;
  socket(channels: string | string[]): Observable<string[]>;
}
