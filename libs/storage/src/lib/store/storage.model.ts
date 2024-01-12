import { SioStorageFileListInterface } from "../interfaces";

export interface SioStorageStateModel {
    bucket: string,
    query: string[]
    data: SioStorageFileListInterface,
}