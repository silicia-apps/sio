export interface SioCoreMessageInterface {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  status: 'pending' | 'sent' | 'received' | 'read';
}