import { SioCoreDocumentInterface } from './document.interface';
export interface SioCoreDocumentsInterface<Document extends SioCoreDocumentInterface> {
    total: number;
    refresh?: boolean;
    documents: Document[];
}