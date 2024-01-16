import { SioCoreDocumentInterface } from './document.interface';
export interface SioCoreDocumentListInterface<Document extends SioCoreDocumentInterface> {
    total: number;
    documents: Document[];
}