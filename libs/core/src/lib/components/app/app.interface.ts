import { SioSideMenuType } from '../../shared/shared.type';
import { SioCoreMenuInterface } from '../menu';
export interface SioCoreAppCompomentInterface {
  title: string;
  //style: number;
  language : {
    default: string,
    fallback: string,
    avaibles: string[],
  };
  sidemenu: SioSideMenuType;
  fullmode?: boolean;
  menu?: { [id: string]: SioCoreMenuInterface };
  urls:
    | {
        login: string;
        redirectTo: string;
      }
    | undefined;
}
 