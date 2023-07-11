export interface SioDatabasePluginServiceInterface {
  Create(value: object, collection : string, database?: string, document?: string): Promise<boolean>;
  List(query: Array<any>, collection: string, database?: string): Promise<Array<any> | boolean>;
  Get(id: string, collection: string, database?: string): Promise<boolean>;
  Delete(id: string, collection: string, database?: string): Promise<boolean>;
}
