import { SioColorType } from "../types";

export interface SioCoreMenuItemInterface {
  id: number;
  icon?: string;
  caption?: string;
  url: string;
  color?: SioColorType,
  type?: 'download' | 'navigate';
  disabled?: boolean;
  badge?: number;
  fab?: boolean;
}