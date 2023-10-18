// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SioCoreEnvironmentInterface, SioCorePluginServiceConfigModel } from '@sio/core';
//import { LOGGER_OPTIONS } from '@angular-ru/cdk/logger';

export const environment: SioCoreEnvironmentInterface = {
  production: false,
  logLevel: 0,
  plugins: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  backend: {},
  app: {
    'language': {
      'avaibles': ['it', 'en'],
      'default': 'it',
      'fallback': 'en',
    },
    'sidemenu': 'toogle',
    'title': 'Demo App',
    'urls': {
      login: '',
      redirectTo: '',
    },
    'menu': {
      'main': {
        'id': 'main',
        'items': {
          1: { 'id': 1, 'icon': 'home', 'url': 'home', badge: 3 },
          2: { 'id': 2, 'icon': 'information-circle', 'url': 'about' },
          3: { 'id': 3, 'icon': 'settings', 'url': 'settings' }
        },
      },
      'logged': {
        'id': 'logged',
        'items': {
          1: {
            'id': 1,
            'icon': 'person',
            'caption': 'T_MENU_LOGGED_PROFILE',
            'url': '/auth/profile',
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
