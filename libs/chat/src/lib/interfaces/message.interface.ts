import { SioDatabaseDocumentInterface } from "@silicia/database";

export interface SioCoreMessageInterface extends SioDatabaseDocumentInterface {
  from: any;
  to: any[];
  content: string;
  type: "text" | "image" | "video" | "audio" | "file";
  state: "pending" | "sended" | "received" | "readed";
}
