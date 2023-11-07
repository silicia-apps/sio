import { SioSideMenuType } from '../types';
import { SioCoreMenuInterface } from './';

export interface SioCoreAppCompomentInterface {
  title?: string;
  language?: {
    default?: string;
    fallback?: string;
    avaibles?: string[];
  };
  layout?: {
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
    split?: boolean | undefined;
    dark?: boolean | undefined;
    full?: boolean | undefined;
  };
  menu?: { [id: string]: SioCoreMenuInterface } | undefined;
  routes?:
    | {
        login: string;
        redirectTo: string;
      }
    | undefined;
}
