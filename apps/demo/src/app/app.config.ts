import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { IonicRouteStrategy } from '@ionic/angular';
import { SioCoreModule } from '@silicia/core';
import { SioAuthModule } from '@silicia/auth';
import { AppwriteAuthModule, AppwriteStorageModule } from '@silicia/appwrite';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { SiliciaInfoFormState1, SiliciaInfoFormState2, SiliciaInfoFormState3 } from './info/info.page.state';
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(SioCoreModule.forRoot(environment)),
    importProvidersFrom(SioAuthModule.forRoot()),
    importProvidersFrom(AppwriteStorageModule.forRoot(environment.backend)),
    importProvidersFrom(AppwriteAuthModule.forRoot(environment.backend)),
    importProvidersFrom(NgxsModule.forFeature([SiliciaInfoFormState1, SiliciaInfoFormState2, SiliciaInfoFormState3])),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      //withDebugTracing(),
    ),
    //provideRouter(sioAuthRoutes),
  ],
};
