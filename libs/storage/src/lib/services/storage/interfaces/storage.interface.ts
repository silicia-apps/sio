import { Observable } from 'rxjs';
import {
  SioStorageFileInterface,
  SioStorageFileListInterface,
} from '../../../interfaces';
export interface SioStorageServiceInterface {
  upload(
    bucketId: string,
    document: SioStorageFileInterface,
    fileId?: string,
  ): Promise<boolean>;
  delete(bucketId: string, fileId: string): Promise<boolean>;
  list(
    bucketId: string,
    queries?: string[],
    search?: string,
  ): Promise<SioStorageFileListInterface | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeEvents(): Observable<any>;
}
