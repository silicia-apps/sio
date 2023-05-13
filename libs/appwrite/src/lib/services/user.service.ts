import { Injectable, Inject } from '@angular/core';
import { Client, Account, Avatars, Models } from 'appwrite';

import { 
  SioAuthUserInterface,
  SioAuthSessionInterface,
  SioAuthPluginServiceInterface,
} from '@sio/auth';

import {
  Loggable,
  SioCoreLoggerService,
  SioCorePluginServiceConfigModel,
  sioCorePluginServiceConfigToken,
} from '@sio/core';
import { Observable, throwError } from 'rxjs';

@Loggable()
@Injectable()
export class SioAppwriteUserService implements SioAuthPluginServiceInterface {
  private readonly account: Account;
  private readonly client: Client;
  private readonly avatars: Avatars;

  // constructor(@Inject(siliciaCoreBackendPluginConfigToken) readonly config: SiliciaCoreBackendPluginConfigInterface) {
  constructor(
    @Inject(sioCorePluginServiceConfigToken)
    readonly config: SioCorePluginServiceConfigModel,
    @Inject(SioCoreLoggerService)
    private loggerService: SioCoreLoggerService
  ) {
    this.client = new Client();
    this.account = new Account(this.client);
    this.avatars = new Avatars(this.client);
    if (this.config !== undefined) {
      this.client
        .setEndpoint(this.config.apiEndpoint || '')
        .setProject(this.config.projectID || '');
      // .setLocale(this.config.locale);
    }
  }

  private sioAuthUser(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Models.User<any>
  ): SioAuthUserInterface {
    return {
      uid: data.$id,
      createdAt: data.$createdAt,
      updatedAt: data.$updatedAt,
      displayName: data.name,
      status: !data.email ? 'anonymous' : 'user',
      details: {
        country: data.prefs.country,
        gender: data.prefs.gender,
        age: data.prefs.age,
        photoURL: data.prefs.avatar || this.avatars.getInitials('User 1'),
      },
      email: {
        address: data.email,
        verified: data.emailVerification,
      },
      phone: {
        number: data.phone,
        verified: data.phoneVerification,
      },
      other: data.prefs,
    };
  }

  private sioAuthSession(
    data: Models.Session
  ): SioAuthSessionInterface {
    return {
      id: data.$id,
      createdAt: data.$createdAt,
      client: {
        code: data.clientCode,
        engine: data.clientEngine,
        name: data.clientName,
        version: data.clientVersion,
        type: data.clientType,
      },
      country: {
        code: data.countryCode,
        name: data.countryName,
      },
      current: data.current,
      device: {
        brand: data.deviceBrand,
        model: data.deviceModel,
        name: data.deviceName,
      },
      expire: data.expire,
      ip: data.ip,
      os: {
        code: data.osCode,
        name: data.osName,
        version: data.osVersion,
      },
      provider: {
        accessToken: data.providerAccessToken,
        accessTokenExpiry: data.providerAccessTokenExpiry,
        provider: data.provider,
        refreshToken: data.providerRefreshToken,
        uid: data.providerUid,
      },
      userId: data.userId,
    };
  }

  async createAnonymousSession(): Promise<SioAuthSessionInterface | null> {
    try {
      this.loggerService.debug(
        '[SioAppwriteUserService][createAnonymousSession] - try to create anonymous session'
      );
      const session = await this.account.createAnonymousSession();
      this.loggerService.debug(
        '[SioAppwriteUserService][createAnonymousSession] - anonymous session created',
        session
      );
      return this.sioAuthSession(session);
    } catch (e) {
      this.loggerService.error(
        '[SioAppwriteUserService][createAnonymousSession] - Get Error on Create anonymous session',
        e as Error
      );
    }
    return null;
  }

  public socket(
    session: string,
    user: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    this.loggerService.info(
      `[SioAppwriteUserService][socket] subscribe socket for account.${user} channel`,
      session,
      user
    );
    return new Observable((observer) => {
      this.client.subscribe('account', (data) => {
        this.loggerService.debug(
          `[SioAppwriteUserService][socket] Detected Session change`,
          data
        );
        if (data.events.includes(`users.${user}.sessions.${session}.delete`)) {
          this.loggerService.info(
            `[SioAppwriteUserService][session] Session ${session} deleted of user ${user}`
          );
          observer.next({ channel: 'authentication', value: 'logout' });
        }
      });
    });
  }

  async getSession(): Promise<SioAuthSessionInterface> {
    try {
      this.loggerService.info(
        '[SioAppwriteUserService][getSession] - request session to backend'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const session: Models.Session = await this.account.getSession('current');
      this.loggerService.debug(
        '[SioAppwriteUserService][getSession] - session data:',
        session
      );
      return this.sioAuthSession(session);
    } catch (e: unknown) {
      throw this.throwError(e as Error);
    }
  }
  async getUser(): Promise<SioAuthUserInterface> {
    try {
      this.loggerService.info(
        '[SioAppwriteUserService][getUser] - request account to backend'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: Models.User<any> = await this.account.get();
      this.loggerService.debug(
        '[SioAppwriteUserService][getUser] - user data:',
        user
      );
      return this.sioAuthUser(user);
    } catch (e: unknown) {
      throw this.throwError(e as Error);
    }
  }

  async createSessionWithCredentials(
    username: string,
    password: string
  ): Promise<SioAuthSessionInterface | null> {
    try {
      this.loggerService.info(
        `[SioAppwriteUserService][createSessionWithCredentials] - request login for ${username}`
      );
      const session = await this.account.createEmailSession(username, password);
      this.loggerService.info(
        `[SioAppwriteUserService][createSessionWithCredentials] - Logged`
      );
      return this.sioAuthSession(session);
    } catch (e) {
      this.loggerService.error(
        '[SioAppwriteUserService][createSessionWithCredentials] - Error Logging in'
      );
      throw this.throwError(e as Error);
    }
  }

  async signup(email: string, password: string, name: string): Promise<any> {
    try {
      this.loggerService.info(
        `[SioAppwriteUserService][signup] - signup for user ${email}`
      );
      name = name ? name : email;
      const account = await this.account.create(
        'unique()',
        email,
        password,
        name
      );
      this.loggerService.info(
        `[SioAppwriteUserService][signup] - User created successfully`
      );
      this.loggerService.debug(
        `[SiliciaAppwriteBackendService][signup] - account: ${account}`
      );
    } catch (e: any) {
      this.loggerService.error(
        `[SiliciaAppwriteBackendService][signup] - Error creating Account`
      );
      throw this.throwError(e as Error);
    }
  }

  oAuth2Login(provider: string): void {
    this.account.createOAuth2Session(
      provider,
      'http://localhost:4200/home',
      'http://localhost:4200/auth/login'
    );
  }

  async logout(session: string = 'current'): Promise<boolean> {
    try {
      this.loggerService.info(`[Appwrite][logout] - Try to logout`);
      await this.account.deleteSession(session);
    } catch (e) {
      this.loggerService.error(`[Appwrite][logout] - Error Loggin Out`, e);
    }
    return true;
  }

  private throwError(e: Error): Error {
    const error = new Error();
    switch (e.message) {
      case 'Invalid email: Value must be a valid email address':
        error.message = 'BACKEND_AUTH_INVALID_USERNAME';
        break;
      case 'User (role: guests) missing scope (account)':
        error.message = 'BACKEND_AUTH_NO_GUEST_ACCESS';
        break;
      case 'Rate limit for the current endpoint has been exceeded. Please try again after some time.':
        error.message = 'BACKEND_RATE_LIMIT';
        break;
      case 'Network request failed':
        error.message = 'NO_NETWORK';
        break;
      case 'Invalid credentials. Please check the email and password.':
        error.message = "BACKEND_AUTH_INVALID_CREDENTIALS";
        break;
      default:
        error.message = e.message;
    }
    error.name = 'sio-error';
    return error;
  }
}
