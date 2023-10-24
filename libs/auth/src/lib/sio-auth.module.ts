import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { SioAuthComponents } from './components';
import { SioCommonModule } from '@silicia/core';
import { SioAuthLoginComponentState } from './components/login/store/login.state';

import { sioAuthRoutes } from './lib.routes';

import { SioAuthState } from './store';

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
  providers: []
})
export class SioAuthModule {}
