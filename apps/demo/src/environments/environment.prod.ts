// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  SioCoreEnvironmentInterface,
  //SioCorePluginServiceConfigModel,
} from '@silicia/core';
//import { LOGGER_OPTIONS } from '@angular-ru/cdk/logger';

export const environment: SioCoreEnvironmentInterface = {
  production: true,
  logLevel: 0,
  plugins: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  backend: {
    apiEndpoint: 'https://baas.jcomwifi.net/v1',
    projectID: '6817a60b003e0208c550'
  },
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
          1: { id: 1, icon: 'home', url: 'home' },
          2: { id: 2, icon: 'folder', url: 'storage' },
          3: { id: 3, icon: 'square', url: 'buttons' },
          4: { id: 4, icon: "chatbubbles", url: "chats" },
        },
      },
      logged: {
        id: 'logged',
        items: {
          1: {
            id: 1,
            icon: 'person',
            caption: 'MENU_LOGGED_PROFILE',
            url: '/auth/profile',
          },
        },
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

