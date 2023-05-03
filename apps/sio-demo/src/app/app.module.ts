import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SioCoreModule, SioCommonModule } from '@sio/core';
import { environment } from '../environments/environment';
import { AppwriteAuthModule } from '@sio/appwrite';
import { SioAuthModule } from '@sio/auth';

@NgModule({
  declarations: [AppComponent],
  //entryComponents: [AppComponent],
  imports: [
    BrowserModule,
    SioCoreModule.forRoot(environment),
    SioCommonModule,
    SioAuthModule,
    AppwriteAuthModule.forRoot(environment.backend),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
