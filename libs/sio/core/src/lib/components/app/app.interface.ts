import { SioSideMenuType } from '../../shared/shared.type';
import { SioCoreMenuInterface } from '../menu';
export interface SioCoreAppCompomentInterface {
  title: string;
  //style: number;
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
