import { SioStorageFileListInterface } from "../interfaces";

export interface SioStorageStateModel {
    bucket: string,
    query: string[]
    files: SioStorageFileListInterface,
}