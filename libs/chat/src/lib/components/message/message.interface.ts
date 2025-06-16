import { SioDatabaseDocumentInterface } from "@silicia/database";

export interface SioChatMessageInterface extends SioDatabaseDocumentInterface {
  body: string;
  user: string;
  date: string;
  avatar: string;
  state: "pending" | "sended" | "received" | "readed";
}
