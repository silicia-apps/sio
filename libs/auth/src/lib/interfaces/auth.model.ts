import { SiliciaCoreAuthSessionModel } from './session.interface';
import { SiliciaCoreAuthUserModel } from './user.interface';
export interface SiliciaCoreAuthStateModel {
  session: SiliciaCoreAuthSessionModel | null;
  user: SiliciaCoreAuthUserModel | null;
  routes: {
    home: string;
    login: string;
    redirectTo: string;
  };
}
