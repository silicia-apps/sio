import { SioAuthSessionInterface } from './session.interface';
import { SioAuthUserInterface } from './user.interface';
export interface SiliciaCoreAuthStateModel {
  session: SioAuthSessionInterface | null;
  user: SioAuthUserInterface | null;
  routes: {
    home: string;
    login: string;
    redirectTo: string;
  };
}
