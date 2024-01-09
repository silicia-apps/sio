import { sioStorageFileInterface } from '../../../interfaces'
export interface SioStoragePluginServiceInterface {
  Upload(bucket : string, file: string, document?: sioStorageFileInterface): Promise<boolean>;
  Delete(bucket : string, file: string ): Promise<boolean>;
  check(bucket: string, file: string): Promise<boolean>;
}
