import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { SioAuthComponents } from './components';
import { SioCommonModule } from '@sio/core';
import { SioAuthLoginComponentState } from './components/login/store/login.state';

import { sioAuthRoutes } from './lib.routes';

import { SioAuthState } from './store';

import { InlineLoaderFactory } from '@sio/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [...SioAuthComponents],
  imports: [
    CommonModule,
    RouterModule.forChild(sioAuthRoutes),
    FormsModule,
    SioCommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SioAuthLoginComponentState, SioAuthState]),
    NgxsFormPluginModule,
  ],
  exports: [...SioAuthComponents],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'auth',
        loader: InlineLoaderFactory(
          (lang: string) => import(`./i18n/${lang}.json`).then((a) => { console.log('logged'); return a}).catch((e) => { console.error(`./i18n/${lang}.json not found`);return {}})
        )
      },
      multi: true,
    },
  ]
})
export class SioAuthModule {}
