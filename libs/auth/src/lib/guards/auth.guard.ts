import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  //RouterStateSnapshot,
} from '@angular/router';
import { SioCoreLoggerService } from '@silicia/core';
import { SioAuthUserStatusType } from '../types';
import { SioAuthState } from '../store';

export const SioAuthGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  //state: RouterStateSnapshot,
) => {
  const sioCoreLoggerService = inject(SioCoreLoggerService);
  const sioAuthState = inject(SioAuthState);
  const router = inject(Router);

  sioCoreLoggerService.debug('[SioAuthGuard][canActivate] start');
  try {
    sioCoreLoggerService.debug(
      '[SioAuthGuard][canActivate] test level',
      route.data,
    );
    const level = route.data['level'] as SioAuthUserStatusType;
    sioCoreLoggerService.info(
      '[sioAuthGuard][canActivate] - check if user is authenticated',
      sioAuthState.isAutenticated,
    );
    if (sioAuthState.isAutenticated) {
      sioCoreLoggerService.info(
        '[sioAuthGuard][canActivate] - user is authenticated',
      );
      sioCoreLoggerService.debug(
        '[sioAuthGuard][canActivate] - check type of user',
      );
      if (sioAuthState.isAutenticated) {
        sioCoreLoggerService.debug(
          '[sioAuthGuard][canActivate] - User Registered',
        );
        return true;
      } else {
        if (sioAuthState.isAnonymous && level === 'anonymous') {
          sioCoreLoggerService.debug(
            '[sioAuthGuard][canActivate] - access granted for anonymous user',
          );
          return true;
        } else {
          sioAuthState.setRedirectTo(route.url);
          sioCoreLoggerService.info(`Redirect to login page ${sioAuthState.snapshot.routes.login}`);
          return router.parseUrl(
            '/info'
            //sioAuthState.snapshot.routes.login
          );
        }
      }
    } else {
      sioCoreLoggerService.info(
        '[sioAuthGuard][canActivate] - check level anonymous',
        level,
      );
      if (level === 'anonymous') {
        sioCoreLoggerService.debug(
          '[sioAuthGuard][canActivate] - create and grant access for anonymous user',
        );
        await sioAuthState.anonymousLogin();
        return true;
      } else {
        sioCoreLoggerService.info(
          '[sioAuthGuard][canActivate] - access denied',
        );
        sioAuthState.setRedirectTo(route.url);
        sioCoreLoggerService.info(`Redirect to login page ${sioAuthState.snapshot.routes.login}`);
        return router.parseUrl(
          sioAuthState.snapshot.routes.login
        );
      }
    }
  } catch (e) {
    sioCoreLoggerService.info(`Redirect to login page ${sioAuthState.snapshot.routes.login}`);
    return router.parseUrl(
      sioAuthState.snapshot.routes.login
    );
  }
};
