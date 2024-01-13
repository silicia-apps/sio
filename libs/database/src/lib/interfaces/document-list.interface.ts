import { SioDatabaseDocumentInterface } from './document.interface';
export interface SioDatabaseDocumentListInterface<Document extends SioDatabaseDocumentInterface> {
    total: number;
    documents: Document[];
}