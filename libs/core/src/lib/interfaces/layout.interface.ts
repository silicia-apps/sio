import { SioSideMenuType } from '../types';

export interface SioCoreLayoutInterface {
    left_panel?: {
      type?: SioSideMenuType;
      menu?: string | undefined;
    };
    right_panel?: {
      type?: SioSideMenuType;
      menu?: string | undefined;
    };
    tab?: {
      mobile?: 'top' | 'bottom' | 'none';
      desktop?: 'left' | 'right' | 'bottom' | 'header' | 'none';
      menu?: string | undefined;
    };
}