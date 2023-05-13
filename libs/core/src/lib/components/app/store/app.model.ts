import { SioSideMenuType } from '../../../shared/shared.type';
import { SioCoreAppCompomentInterface } from '../app.interface';
import { SioCoreMenuInterface } from '../../menu';
import { SioCoreTabsStateModel } from '../../tabs';

export interface SioCoreAppComponentStateModel extends SioCoreAppCompomentInterface {
  title: string;
  dark: boolean | undefined;
  split: boolean | undefined;
  urls: {
    login: string;
    redirectTo: string;
  } | undefined;
  sidemenu: SioSideMenuType;
  menu: { [id: string]: SioCoreMenuInterface } | undefined;
  tabs: { [id: string]: SioCoreTabsStateModel } | undefined;
  loading: {
    show: boolean;
    message?: string;
  } | undefined;
  errors?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    action: Function;
    name: string;
    message: string;
  } | undefined;
}
