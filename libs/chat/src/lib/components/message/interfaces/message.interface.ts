export interface SioCoreMessageInterface {
  content: string;
  type: "text" | "image" | "video" | "audio" | "file";
  status: "pending" | "sent" | "received" | "read";
}
