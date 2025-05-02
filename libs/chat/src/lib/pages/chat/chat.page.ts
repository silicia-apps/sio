import { Component, OnInit } from '@angular/core';
import {
  SioCoreAppComponentState,
  Loggable } from '@silicia/core';


@Loggable()
@Component({
    selector: 'sio-chat-page',
    templateUrl: 'chat.page.html',
    styleUrls: ['chat.page.scss'],
    standalone: false,
})
export class SioChatPage implements OnInit {
  public id='1';
  public user='2';
  public msgList = [
    { id: '1', user: '2', text: 'Hello', userName: 'John', status: 'sent', time: '10:00 AM', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'},
    { id: '2', user: '1', text: 'Hi' , userName: 'Jane' , status: 'received', time: '10:01 AM', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'},
    { id: '3', user: '2', text: 'How are you?', userName: 'John', status: 'sent' , time: '10:02 AM', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'},
    { id: '4', user: '1', text: 'I am fine, thank you!', UserName: 'Jane', status: 'received', time: '10:03 AM', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'},
    { id: '5', user: '2', text: 'What about you?', userName: 'John' , status:  'pending', time:  '11:00', avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'},]
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

