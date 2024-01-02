export interface SioStoragePluginServiceInterface {
  Upload(bucket : string, file: string, document?: File[]): Promise<boolean>;
  Delete(bucket : string, file: string ): Promise<boolean>;
}
