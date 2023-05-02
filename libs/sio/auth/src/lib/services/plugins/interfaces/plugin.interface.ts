import {
  SioAuthSessionInterface,
  SioAuthUserInterface,
} from '../../../interfaces';
import { Observable } from 'rxjs';

export interface SioAuthPluginServiceInterface {
  getUser(): Promise<SioAuthUserInterface | null>;
  getSession(): Promise<SioAuthSessionInterface | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket(session: string, user: string): Observable<any>;
  createSessionWithCredentials(
    username: string,
    password: string
  ): Promise<SioAuthSessionInterface | null>;
  createAnonymousSession(): Promise<SioAuthSessionInterface | null>;
  oAuth2Login(provider: string): void;
  logout(session: string): Promise<boolean>;
}
