import { Preview, applicationConfig } from '@storybook/angular';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import * as docJson from '../documentation.json';
import { SioCoreModule } from '../src/lib/core.module';
import { importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, Routes, provideRouter } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

setCompodocJson(docJson);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }]
const environment = {
  production: false,
  logLevel: 0,
  plugins: [],
  backend: {},
  app: {
    title: 'Demo App',
    language: {
      avaibles: ['it', 'en'],
      default: 'it',
      fallback: 'en',
    },
    menu: {
      main: {
        id: 'main',
        items: {
          1: { id: 1, icon: 'home', url: 'home', badge: 3 },
          2: { id: 2, icon: 'information-circle', url: 'info' },
          3: { id: 3, icon: 'settings', url: 'settings' },
        },
      },
      secondary: {
        id: 'secondary',
        items: {
          1: { id: 1, icon: 'stats', url: 'stats', badge: 3 },
          2: { id: 2, icon: 'information-circle', url: 'info' },
          3: { id: 3, icon: 'settings', url: 'settings' },
        },
      },
      logged: {
        id: 'logged',
        items: {
          1: {
            id: 1,
            icon: 'person',
            caption: 'T_MENU_LOGGED_PROFILE',
            url: '/auth/profile',
          },
        },
      },
    },
  },
};

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        importProvidersFrom(SioCoreModule.forRoot(environment)),
        provideRouter(routes),
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      toc: false, 
    },
  },
};

export default preview;
