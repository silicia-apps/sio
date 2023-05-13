import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SioAuthSignupPage } from './signup.page';
import { SioCommonModule } from '@sio/core';
import { SioAuthModule } from "../../sio-auth.module";

const routes: Routes = [
  {
    path: '',
    component: SioAuthSignupPage,
  },
];

@NgModule({
    declarations: [SioAuthSignupPage],
    imports: [
        CommonModule,
        SioCommonModule.forChild(),
        SioAuthModule,
        RouterModule.forChild(routes),
    ]
})
export class SioAuthSignupPageModule {}
