/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import {
  SioCoreAppComponentState,
  Loggable } from '@silicia/core';

@Loggable()
@Component({
    templateUrl: 'chat-list.page.html',
    styleUrls: ['chat-list.page.scss'],
    standalone: false
})
export class SioChatListPage implements OnInit {
  constructor(
    public sioCoreAppComponentState: SioCoreAppComponentState,
    //private sioCoreLoggerService: SioCoreLoggerService
  ) {
    
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    //this.sioCoreLoggerService.debug(`[SioAUthLoginPage][ngOnInit]`);
  }

  
}

