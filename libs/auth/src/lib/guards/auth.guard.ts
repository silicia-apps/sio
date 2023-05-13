import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Loggable, SioCoreLoggerService } from '@sio/core';
import { SioAuthUserStatusType } from '../types';
import { SioAuthState } from '../store';

@Loggable()
@Injectable({
  providedIn: 'root',
})
export class SioAuthGuard {
  constructor(
    private router: Router,
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioAuthState: SioAuthState
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    try {
      this.sioCoreLoggerService.debug(
        '[SioAuthGuard][canActivate] test level',
        route.data
      );
      const level = route.data['level'] as SioAuthUserStatusType;
      this.sioCoreLoggerService.info(
        '[sioCoreAuthGuard][canActivate] - check if user is authenticated',
        this.sioAuthState.isAutenticated
      );
      if (
        this.sioAuthState.isAutenticated ||
        (await this.sioAuthState.checkSession())
      ) {
        this.sioCoreLoggerService.info(
          '[sioCoreAuthGuard][canActivate] - user is authenticated'
        );
        this.sioCoreLoggerService.debug(
          '[sioCoreAuthGuard][canActivate] - check type of user'
        );
        if (this.sioAuthState.isAutenticated) {
          this.sioCoreLoggerService.debug(
            '[sioCoreAuthGuard][canActivate] - User Registered'
          );
          return true;
        } else {
          if (
            this.sioAuthState.isAnonymous &&
            level === 'anonymous'
          ) {
            this.sioCoreLoggerService.debug(
              '[sioCoreAuthGuard][canActivate] - access granted for anonymous user'
            );
            return true;
          } else {
            this.sioAuthState.setRedirectTo(route.url);
            return this.router.parseUrl(
              this.sioAuthState.snapshot.routes.login
            );
          }
        }
      } else {
        this.sioCoreLoggerService.info(
          '[SiliciaCoreAuthGuard][canActivate] - check level anonymous',
          level
        );
        if (level === 'anonymous') {
          this.sioCoreLoggerService.debug(
            '[SiliciaCoreAuthGuard][canActivate] - create and grant access for anonymous user'
          );
          await this.sioAuthState.anonymousLogin();
          return true;
        } else {
          this.sioCoreLoggerService.info(
            '[SiliciaCoreAuthGuard][canActivate] - access denied'
          );
          this.sioAuthState.setRedirectTo(route.url);
          return this.router.parseUrl(
            this.sioAuthState.snapshot.routes.login
          );
        }
      }
    } catch (e) {
      return this.router.parseUrl(
        this.sioAuthState.snapshot.routes.login
      );
    }
    return false;
  }
}
