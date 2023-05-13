import { SioCoreAppComponentState } from '../components/app/store';
import { SioCoreMenuState } from '../components/menu/store';
import { SioCoreFormComponentState } from '../components/form/store/form.state';
import { SioCoreTabsState } from '../components/tabs/store/tabs.state';
import { SioCorePageComponentState } from '../components/page/store';

export * from '../components/app/store';
export * from '../components/menu/store';
export * from '../components/tabs/store';
export * from '../components/page/store';
export * from '../components/form/store/form.state';

export const sioCoreStates = [
  SioCoreAppComponentState,
  SioCoreMenuState,
  SioCoreFormComponentState,
  SioCoreTabsState,
  SioCorePageComponentState,
];