import {
  ModuleWithProviders,
  NgModule,
  
  //Optional,
  //SkipSelf,
} from "@angular/core";

import { MomentModule } from 'ngx-moment';

import { CommonModule } from "@angular/common";
import {
  PreloadAllModules,
  //RouterModule,
  provideRouter,
  withPreloading,
} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxsModule } from "@ngxs/store";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";

import { SioChatComponents } from "./components";
import { SioCommonModule } from "@silicia/core";
import { SioChatState } from "./store";

import { sioChatRoutes } from "./sio-chat.routes";

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: NgModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}

@NgModule({
  declarations: [],
  imports: [
    SioChatComponents,
    CommonModule,
    FormsModule,
    SioCommonModule,
    MomentModule.forRoot(),
    ReactiveFormsModule,
    NgxsModule.forFeature([SioChatState]),
    NgxsFormPluginModule,
  ],
  exports: [...SioChatComponents],
})
export class SioChatModule {
  constructor() {
    //@Optional() @SkipSelf() parentModule: SioAuthModule) {
    //super(parentModule);
  }

  static forRoot(): ModuleWithProviders<SioChatModule> {
    return {
      ngModule: SioChatModule,
      providers: [
        provideRouter(sioChatRoutes, withPreloading(PreloadAllModules)),
      ],
    };
  }
}
