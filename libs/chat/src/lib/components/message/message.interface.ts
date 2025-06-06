import { SioDatabaseDocumentInterface } from "@silicia/database";

export interface SioChatMessageInterface extends SioDatabaseDocumentInterface {
  chatId: any;
  to: any[];
  content: string;
  type: "text" | "image" | "video" | "audio" | "file";
  state: "pending" | "sended" | "received" | "readed";
}
