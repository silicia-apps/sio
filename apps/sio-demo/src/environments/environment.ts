import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SioCoreEnvironmentInterface, SioCorePluginServiceConfigModel } from '@sio/core';
import { LOGGER_OPTIONS } from '@angular-ru/cdk/logger';

const appwriteConfig: SioCorePluginServiceConfigModel = {
  apiEndpoint: 'https://cloud.appwrite.io/v1',
  projectID: '644141e23f4adef77256',
  collectionID: '606621a04837c', //?!?
};
export const environment: SioCoreEnvironmentInterface = {
  production: false,
  language: {
    avaibles: ['it', 'en'],
    default: 'it',
    fallback: 'en',
  },
  logLevel: 0,
  plugins: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  backend: appwriteConfig,
  app: {
    'sidemenu': 'overlay',
    title: 'Demo',
    urls: {
      login: '',
      redirectTo: '',
    },
    menu: {
      main: {
        id: 'main',
        style: 'rounded',
        items: {
          1: { id: 1, icon: 'home', url: 'home' },
          2: { id: 2, icon: 'lock-open', url: 'public'},
          3: { id: 3, icon: 'lock-closed', url: 'private' },
        },
      },
      logged: {
        id: 'logged',
        style: 'custom',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

