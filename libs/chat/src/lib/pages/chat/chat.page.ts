import { Component, OnInit } from '@angular/core';
import {
  //SioCoreAppComponentState,
  Loggable,
  SioCommonModule,
  SioCoreLoggerService
} from '@silicia/core';
import { SioDatabaseModule } from '@silicia/database';
import { SioChatComponent } from '../../components/chat';
import { MomentModule } from 'ngx-moment';



@Loggable()
@Component({
  selector: 'sio-chat-page',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  imports: [SioCommonModule, SioDatabaseModule, SioChatComponent, MomentModule],
  standalone: true,
})
export class SioChatPage implements OnInit {

  constructor(
    //private sioCoreAppComponentState: SioCoreAppComponentState,
    private sioCoreLoggerService: SioCoreLoggerService
  ) {

  }

  public sendMessage() {
    this.sioCoreLoggerService.debug('[SioChatPage][sendMessage]');
  }
  ngOnInit() {
    this.sioCoreLoggerService.debug('[SioChatPage][ngOnInit]');
  }

  public click(event: Event) {
    this.sioCoreLoggerService.debug('[SioChatPage][onClick]', event);
  }

  public onFocus() {
    this.sioCoreLoggerService.debug('[SioChatPage][onFocus]');
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

