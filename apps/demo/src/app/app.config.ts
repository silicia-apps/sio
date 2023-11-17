import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { IonicRouteStrategy } from '@ionic/angular';
import { SioCoreModule } from '@silicia/core';
import { sioAuthRoutes } from '@silicia/auth';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(SioCoreModule.forRoot(environment)),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
    provideRouter(sioAuthRoutes)
  ],
};
