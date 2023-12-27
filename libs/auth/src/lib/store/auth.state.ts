import { Injectable } from '@angular/core';

// NGXS - Store
import { ActionType, NgxsOnInit, Selector, State } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';

// SIO
import { SioAuthStateModel } from './auth.model';
import { SioAuthSessionInterface, SioAuthUserInterface } from '../interfaces';
import {
  SioCoreLoggerService,
  SioCoreAppComponentState,
} from '@silicia/core';

import {
  SioAuthPluginService
} from '../services/plugins';


@StateRepository()
@State<SioAuthStateModel>({
  name: 'auth',
  defaults: {
    session: null,
    user: null,
    routes: {
      home: '/home',
      login: '/auth/login',
      redirectTo: '/',
    },
  },
})
@Injectable()
export class SioAuthState
  extends NgxsDataRepository<SioAuthStateModel>
  implements NgxsOnInit
{
  constructor(
    private sioCoreAppComponentState: SioCoreAppComponentState,
    private sioAuthPluginService: SioAuthPluginService,
    private sioCoreLoggerService: SioCoreLoggerService
  ) {
    super();
  }

  @Selector()
  static session(state: SioAuthStateModel): SioAuthSessionInterface | null {
    return state.session;
  }

  @Computed()
  public get user(): SioAuthUserInterface | null {
    return this.snapshot.user;
  }

  @Computed()
  public get isAutenticated(): boolean {
    this.sioCoreLoggerService.info(
      '[SioAuthState][isAuthenticated] check if user is authenticated',
      this.snapshot.user?.status
    );
    if (!this.snapshot.user) async () => { await this.checkSession() };
    return this.snapshot.user?.status === 'user';
  }

  @Computed()
  public get isAnonymous(): boolean {
    this.sioCoreLoggerService.info(
      '[SioAuthState][isAnonymous] check if user is anonymous',
      this.snapshot.user?.status
    );
    return this.snapshot.user?.status === 'anonymous';
  }

  @Computed()
  public get token(): string | undefined {
    this.sioCoreLoggerService.debug(
      '[SioAuthState][token] get token',
      this.snapshot.session?.provider.accessToken
    );
    return this.snapshot.session?.provider.accessToken;
  }

  @DataAction()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setRedirectTo(value: { path: string }[]) {
    this.patchState({
      routes: {
        home: this.snapshot.routes.home,
        login: this.snapshot.routes.login,
        redirectTo: `/${value[0].path}`,
      },
    });
    this.sioCoreLoggerService.debug('[SioAuthState][setRedirectTo] Set redirect url to ' + value, this.snapshot.routes.redirectTo);
  }

  public async storeSession(
    data: SioAuthSessionInterface | null
  ): Promise<boolean> {
    if (data) {
      this.patchState({ session: data });
      const user = await this.sioAuthPluginService.getUser();
      if (user) {
        this.patchState({ user: user });
        this.sioAuthPluginService
          .socket(data.id, data.userId)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .subscribe((data:any) => {
            this.sioCoreLoggerService.debug(
              '[SioAuthState][storeSession] - get new data',
              data
            );
            switch (data.channel) {
              case 'authentication':
                switch (data.value) {
                  case 'logout':
                    this.sioCoreLoggerService.info(
                      '[SioAuthState][socket] User Logged Out'
                    );
                    this.sioCoreLoggerService.info(
                      '[SioAuthState][socket] Redirect User to Start Page',
                      '/home'
                    );
                    this.dispatch(
                      new Navigate([
                        this.snapshot.routes.home,
                      ]) as unknown as ActionType
                    );
                    break;
                  default:
                    this.sioCoreLoggerService.debug(
                      '[SioAuthState][socket] unknow event',
                      data.value
                    );
                }
                break;
              default:
                this.sioCoreLoggerService.debug(
                  '[SioAuthState][socket] unknow channel',
                  data.value
                );
            }
          });
      }
      return true;
    } else {
      return false;
    }
  }

  @DataAction()
  public async checkSession(): Promise<boolean> {
    try {
      this.sioCoreLoggerService.info('[SioAuthState][getUser] - Get Session');
      const session = await this.sioAuthPluginService.getSession();
      return await this.storeSession(session);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
    }
    return false;
  }

  @DataAction()
  public async anonymousLogin(): Promise<boolean> {
    const session = await this.sioAuthPluginService.createAnonymousSession();
    return await this.storeSession(session);
  }

  @DataAction()
  public async loginWithCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    const session =
      await this.sioAuthPluginService.createSessionWithCredentials(
        username,
        password
      );
    return await this.storeSession(session);
  }

  @DataAction()
  public async logout(): Promise<void> {
    try {
      if (this.snapshot.session) this.patchState({ user: null, session: null });
      await this.sioAuthPluginService.logout('current');
    } catch (e) {
      const error = e as Error;
      if (error.name === 'sio-error')
        this.sioCoreAppComponentState.throwError(error.message, error.name);
    }
  }

  @DataAction()
  public oAuth2Login(provider: string): void {
    this.sioAuthPluginService.oAuth2Login(provider);
  }
}
