import { Observable } from "rxjs";
import { SioDatabaseDocumentListInterface, SioDatabaseDocumentInterface } from "../../../interfaces";

export interface SioDatabaseServiceInterface {
  create(value: object, collection : string, database?: string, document?: string): Promise<boolean>;
  query(databaseId: string, collectionId: string, queries: string[] | undefined): Promise<SioDatabaseDocumentListInterface<SioDatabaseDocumentInterface>>;
  get(id: string, collection: string, database?: string): Promise<boolean>;
  delete(id: string, collection: string, database?: string): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(): Observable<any>;
}
