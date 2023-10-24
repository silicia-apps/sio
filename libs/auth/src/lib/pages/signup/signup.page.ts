/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { SioCoreAppComponentState, SioCoreLoggerService } from '@silicia/core';

@Component({
  selector: 'sio-auth-signup-page',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SioAuthSignupPage implements OnInit {
  constructor(
    public sioCoreAppComponentState: SioCoreAppComponentState,
    private sioCoreLoggerService: SioCoreLoggerService
  ) {}

  ngOnInit() {
    this.sioCoreLoggerService.debug('[SioAuthSignupPage][ngOnInit]');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginGmail() {}
}
