import { SioCoreMenuItemInterface } from './menu-item.interface';

export interface SioCoreMenuInterface {
  id: string;
  enabled?: boolean;
  showed?: boolean;
  caption?: string;
  type?: 'default' | 'popup' | 'popover' | 'swipe';
  style?: 'default' | 'rounded' | 'custom' | 'tab';
  items: { [id: number]: SioCoreMenuItemInterface };
}
