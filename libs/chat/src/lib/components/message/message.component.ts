import { Component, Input } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

import { SioColorType } from '@silicia/core';

import { TranslateService } from '@ngx-translate/core';
import { languages } from './i18n';

@Component({
  selector: 'sio-chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [CommonModule, SioCommonModule, MomentModule],
  standalone: true,
})
export class SioChatMessageComponent {
  @Input() public ID: string = '';
  @Input() public state: 'pending' | 'sended' | 'received' | 'readed' = 'pending';
  @Input() public message: string = '';
  @Input() public date: string = '';
  @Input() public received: boolean = false;
  @Input() public user: string = '';
  @Input() public avatar: string | undefined = 'https://gravatar.com/avatar/a3007c7ee09b7157b4ca921712dbd814?s=400&d=robohash&r=x';
  @Input() public sent_color: SioColorType = 'primary';
  @Input() public received_color: SioColorType = 'secondary';
  @Input() public isLastMessage: boolean = false;
  @Input() public isLastUserMessage: boolean = false;

  constructor(private translateService: TranslateService) {
    languages.forEach((lang) => {
      this.translateService.setTranslation(lang.key, lang.value, true);
    });
  }
}
