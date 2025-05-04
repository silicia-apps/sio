import { Component, OnInit } from '@angular/core';
import {
  //SioCoreAppComponentState,
  Loggable,
  SioCoreLoggerService
} from '@silicia/core';


@Loggable()
@Component({
  selector: 'sio-chat-page',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  standalone: false,
})
export class SioChatPage implements OnInit {

  constructor(
    //private sioCoreAppComponentState: SioCoreAppComponentState,
    private sioCoreLoggerService: SioCoreLoggerService
  ) {

  }

  ngOnInit() {
    this.sioCoreLoggerService.debug('[SioChatPage][ngOnInit]');
  }

  public click(event: Event) {
    this.sioCoreLoggerService.debug('[SioChatPage][onClick]', event);
  }

  public infinite(event: Event) {
    this.sioCoreLoggerService.debug('[SioChatPage][onInfinite]', event);
  }

  public refresh(event: Event) {
    this.sioCoreLoggerService.debug('[SioChatPage][onRefresh]', event);
  }

  public load(event: Event) {
    this.sioCoreLoggerService.debug('[SioChatPage][onLoad]', event);
  }

}

