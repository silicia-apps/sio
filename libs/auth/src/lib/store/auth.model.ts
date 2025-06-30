import { SioAuthSessionInterface, SioAuthUserInterface } from '../interfaces';

export interface SioAuthStateModel {
  session: SioAuthSessionInterface | null;
  user?: SioAuthUserInterface;
  routes: {
    home: string;
    login: string;
    redirectTo: string;
  };
}
