[![gitbook](https://img.shields.io/badge/documentation-gitbook-blue)](https://silicia-apps.gitbook.io/sio-framework/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/62d58ded-4eea-433b-ba6e-160b8ce1b70d/deploy-status)](https://app.netlify.com/sites/sio-demo/deploys)
[![compile](https://github.com/silicia-apps/sio/actions/workflows/compile.yml/badge.svg)](https://github.com/silicia-apps/sio/actions/workflows/compile.yml)

DEMO [a link] (https://sio-demo.netlify.com)

Silicia Ionic Framework (SIO) is a library for developing open-source hybrid applications released under the MIT license. This library was created with the aim of eliminating all the redundant code necessary for development in ionic or angular and with the purpose of inserting the most used libraries. Here are the features of the library:

* state integration with ngxs and angular-ru/ngxs libraries
* multilingual support integration via ngx-translate library
* plugin support for various types of backends (currently appwrite)
* wrapping core Ionic components into new components with state and other functionality (such as dynamic forms and menus)

The library is in a pre-alpha state. If you want to test to participate in the development, even if only as a tester or to send suggestions

Installation
to install the library add it to your project

```bash
$ npm install @silicia/core
```
start a new ionic project with

```bash
$ ionic start --type=angular sio-demo blank
```
app.modules.ts

open the app.module.ts file and add the library

```ts
...
import { environment } from '../assets/environments/environment';
import {} from '@silicia/core';
...
@NgModule({
  ...
  imports: [
    ...
    SioCoreModule.forRoot(environment),
    SioCommonModule,
    ...
  ],
  ...
});
...
```

the SioCoreModule module must be imported only in the main module of your application, while SioCommonModule must be imported in each LazyModule (typically the app pages) in which you want to have access to the library components.

app.component.html

Once this is done, it is necessary to modify the app.component.html file by inserting the main component of SIO or the sio-app component

<sio-app></sio-app>
