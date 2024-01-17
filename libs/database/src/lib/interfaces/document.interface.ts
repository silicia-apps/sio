export interface SioDatabaseDocumentInterface {
  $id?: number | string;
  $collectionId?: string;
  $databaseId?: string;
  $createdAt?: string;
  $updatedAt?: string;
  $permissions?: string[];
  [key: string]: unknown; 
}