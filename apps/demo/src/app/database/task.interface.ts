import { SioDatabaseDocumentInterface } from '@silicia/database';
export interface taskInterface extends SioDatabaseDocumentInterface {
    name: string, description: string;
}