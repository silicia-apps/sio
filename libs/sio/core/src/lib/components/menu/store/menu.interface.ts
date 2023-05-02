import { SioCoreMenuItemInterface } from '../../menu-item';

export interface SioCoreMenuInterface {
  id: string;
  enabled?: boolean;
  showed?: boolean;
  caption?: string;
  style?: 'default' | 'rounded' | 'custom' | 'tab';
  items: { [id: number]: SioCoreMenuItemInterface };
}
