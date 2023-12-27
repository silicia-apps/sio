import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  PreloadAllModules,
  //RouterModule,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { SioAuthComponents } from './components';
import { SioCommonModule } from '@silicia/core';
import { SioAuthLoginComponentState } from './components/login/store/login.state';

import { sioAuthRoutes } from './lib.routes';
import { SioAuthState } from './store';

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: NgModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`,
      );
    }
  }
}

@NgModule({
  declarations: [...SioAuthComponents],
  imports: [
    CommonModule,
    //RouterModule.forChild(sioAuthRoutes),
    FormsModule,
    SioCommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SioAuthLoginComponentState, SioAuthState]),
    NgxsFormPluginModule,
  ],
  exports: [...SioAuthComponents],
})
export class SioAuthModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: SioAuthModule) {
    super(parentModule);
  }

  static forRoot(): ModuleWithProviders<SioAuthModule> {
    return {
      ngModule: SioAuthModule,
      providers: [
        provideRouter(sioAuthRoutes, withPreloading(PreloadAllModules)),
      ],
    };
  }
}
