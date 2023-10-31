export interface SioCoreMenuItemInterface {
  id: number;
  icon?: string;
  caption?: string;
  url: string;
  type?: 'download' | 'navigate';
  disabled?: boolean;
  badge?: number;
  fab?: boolean;
}