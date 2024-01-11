import { Observable } from 'rxjs';
import {
  SioStorageFileInterface,
  SioStorageFileListInterface,
} from '../../../interfaces';
export interface SioStorageServiceInterface {
  Upload(
    bucketId: string,
    document: SioStorageFileInterface,
    fileId?: string,
  ): Promise<boolean>;
  Delete(fileId: string, bucketId: string): Promise<boolean>;
  List(
    bucketId: string,
    queries?: string[],
    search?: string,
  ): Promise<SioStorageFileListInterface | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SubscribeEvents(): Observable<any>;
}
