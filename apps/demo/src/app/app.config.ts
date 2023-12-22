import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { IonicRouteStrategy } from '@ionic/angular';
import { SioCoreModule } from '@silicia/core';
import { SioAuthModule } from '@silicia/auth';
import { AppwriteAuthModule } from '@silicia/appwrite';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(SioCoreModule.forRoot(environment)),
    importProvidersFrom(SioAuthModule.forRoot()),
    importProvidersFrom(AppwriteAuthModule.forRoot(environment.backend)),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      //withDebugTracing(),
    ),
    //provideRouter(sioAuthRoutes),
  ],
};
