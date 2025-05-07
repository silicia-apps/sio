import { Observable } from 'rxjs';
import {
  SioDatabaseDocumentListInterface,
  SioDatabaseDocumentInterface,
} from '../../../interfaces';

type QueryTypesSingle = string | number | boolean;
export type QueryTypesList = string[] | number[] | boolean[];
export type QueryTypes = QueryTypesSingle | QueryTypesList;

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
  delete(
    documentId: string | number,
    collectionId?: string,
    databaseId?: string,
  ): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(): Observable<any>;

  equal(attribute: string, values: QueryTypes): string;
  notEqual(attribute: string, values: QueryTypes): string;
  lessThan(attribute: string, values: QueryTypes): string;
  lessThanEqual(attribute: string, values: QueryTypes): string;
  greaterThan(attribute: string, values: QueryTypes): string;
  greaterThanEqual(attribute: string, values: QueryTypes): string;
  search(attribute: string, values: string): string;
  orderDesc(attribute: string): string;
  orderAsc(attribute: string): string;
  cursorAfter(documentId: string): string;
  cursorBefore(documentId: string): string;
  limit(limit: number): string;
  offset(offset: number): string;
}
