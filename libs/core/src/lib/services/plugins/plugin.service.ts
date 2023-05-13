/*import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs'; 
/*import {
  SioCoreAuthSessionModel,
  SioCoreAuthUserModel,
} from '../auth';
import { Loggable } from '../../..';
import { SioCoreAppComponentState } from '../../store';
import { SioCorePluginServiceModel } from '../../interfaces';
import { SioCorePluginServiceToken } from './tokens';

@Loggable()
@Injectable({ providedIn: 'root' })
export class SioCorePluginService
  implements SioCorePluginServiceModel
{
  private readonly plugins: SioCorePluginServiceModel[];

  constructor(
    @Optional()
    @Inject(SioCorePluginServiceToken)
    plugins: SioCorePluginServiceModel[],
    private sioCoreAppComponentState: SioCoreAppComponentState
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
  }

  async getUser(): Promise<SioCoreAuthUserModel | null> {
    try {
      return this.plugins[0].getUser();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
    }
    return null;
  }

  async getSession(): Promise<SioCoreAuthSessionModel | null> {
    try {
      return this.plugins[0].getSession();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
    }
    return null;
  }

  async createSessionWithCredentials(
    username: string,
    password: string
  ): Promise<SioCoreAuthSessionModel | null> {
    try {
      return this.plugins[0].createSessionWithCredentials(username, password);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
      return null;
    }
  }

  async createAnonymousSession(): Promise<SioCoreAuthSessionModel | null> {
    try {
      return this.plugins[0].createAnonymousSession();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket(session: string, user: string): Observable<any> {
    return this.plugins[0].socket(session, user);
  }

  oAuth2Login(provider: string): void {
    this.plugins[0].oAuth2Login(provider);
  }

  logout(session: string): Promise<boolean> {
    return this.plugins[0].logout(session);
  }
}
*/