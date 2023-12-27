import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SioAuthSessionInterface,
  SioAuthUserInterface,
} from '../../interfaces';
import { SioCoreAppComponentState, SioCoreLoggerService } from '@silicia/core';
import { SioAuthPluginServiceInterface } from './interfaces';
import { SioAuthPluginServiceToken } from './tokens';
import { it } from './i18n/it';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class SioAuthPluginService implements SioAuthPluginServiceInterface {
  private readonly plugins: SioAuthPluginServiceInterface[];

  constructor(
    @Optional()
    @Inject(SioAuthPluginServiceToken)
    plugins: SioAuthPluginServiceInterface[],
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private sioCoreLoggerService: SioCoreLoggerService,
    private translateService: TranslateService
  ) {
    plugins = plugins || [];
    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
    this.sioCoreLoggerService.debug(`[SioAuthPluginService][constructor] Load Translations`);
    this.translateService.setTranslation('it', it, true);
    this.sioCoreLoggerService.debug('',this.translateService)
  }

  async getUser(): Promise<SioAuthUserInterface | null> {
    try {
      return this.plugins[0].getUser();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'AUTH_ERROR'
        );
    }
    return null;
  }

  async getSession(): Promise<SioAuthSessionInterface | null> {
    try {
      this.sioCoreLoggerService.info(
        '[SioAuthPluginService][getSession] - Check session'
      );
      return await this.plugins[0].getSession();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'AUTH_ERROR'
        );
    }
    return null;
  }

  async createSessionWithCredentials(
    username: string,
    password: string
  ): Promise<SioAuthSessionInterface | null> {
    try {
      return await this.plugins[0].createSessionWithCredentials(username, password);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'AUTH_ERROR'
        );
      return null;
    }
  }

  async createAnonymousSession(): Promise<SioAuthSessionInterface | null> {
    try {
      return this.plugins[0].createAnonymousSession();
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(
          error.message,
          'AUTH_ERROR'
        );
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
