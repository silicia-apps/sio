/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import {
  SioCoreAppComponentState,
  SioCoreLoggerService,
  Loggable } from '@sio/core';

@Loggable()
@Component({
  selector: 'sio-auth-login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class SioAuthLoginPage implements OnInit {
  constructor(
    public sioCoreAppComponentState: SioCoreAppComponentState,
    //private sioCoreLoggerService: SioCoreLoggerService
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    //this.sioCoreLoggerService.debug(`[SioAUthLoginPage][ngOnInit]`);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginGmail() {
    //this.sioCoreLoggerService.info(`[SioAUthLoginPage][loginGmail]`);
  }
}
