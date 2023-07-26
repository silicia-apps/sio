import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SioCoreModule } from '@sio/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}), SioCoreModule.forRoot(environment)),
    provideRouter(routes),
  ],
};
