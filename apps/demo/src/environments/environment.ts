// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import {
  SioCoreEnvironmentInterface,
  //SioCorePluginServiceConfigModel,
} from "@silicia/core";
//import { LOGGER_OPTIONS } from '@angular-ru/cdk/logger';

export const environment: SioCoreEnvironmentInterface = {
  production: false,
  logLevel: 0,
  plugins: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  backend: {
    apiEndpoint: "https://baas.jcomwifi.net/v1",
    projectID: "6817a60b003e0208c550",
  },
  other: {
    'chat': {
      'database_id': '6817a6cc0008ab4f96fb',
      'collection_rooms_id': '683d7afc001fac5c00bc',
      'collection_messages_id': '683d7b9d0005eeefa56f',
      'collection_profiles_id': '683d897400027c1ed4bf'
    }
  },
  app: {
    title: "Demo App",
    language: {
      avaibles: ["it", "en"],
      default: "it",
      fallback: "en",
    },
    menu: {
      main: {
        id: "main",
        items: {
          1: { id: 1, icon: "home", url: "home" },
          2: { id: 2, icon: "folder", url: "storage" },
          3: { id: 3, icon: "archive", url: "database" },
          4: { id: 4, icon: "chatbubbles", url: "chats" },
        },
      },
      logged: {
        id: "logged",
        items: {
          1: {
            id: 1,
            icon: "person",
            caption: "MENU_LOGGED_PROFILE",
            url: "/auth/profile",
          },
        },
      },
      left_items: {
        id: "left_items",
        items: {
          1: {
            id: 1,
            caption: "trash",
            icon: "trash",
            color: "danger",
            url: "/",
          },
        },
      },
      right_items: {
        id: "right_items",
        items: {
          1: {
            id: 1,
            caption: "archive",
            icon: "checkmark",
            color: "success",
            url: "/",
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
