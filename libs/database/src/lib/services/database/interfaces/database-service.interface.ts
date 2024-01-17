import { Observable } from 'rxjs';
import {
  SioDatabaseDocumentListInterface,
  SioDatabaseDocumentInterface,
} from '../../../interfaces';

export interface SioDatabaseServiceInterface {
  add(
    value: SioDatabaseDocumentInterface,
    collectionId?: string,
    databaseId?: string,
    documentId?: string | number,
  ): Promise<boolean>;
  query(
    databaseId: string,
    collectionId: string,
    queries: string[] | undefined,
  ): Promise<SioDatabaseDocumentListInterface<SioDatabaseDocumentInterface>>;
  get(id: string, collection: string, database?: string): Promise<boolean>;
  set(
    id: string,
    data: SioDatabaseDocumentInterface,
    collectionId: string,
    databaseId: string,
  ): Promise<boolean>;
  delete(documentId: string | number, collectionId?: string, databaseId?: string): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(): Observable<any>;
}
