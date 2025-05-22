import { Component, OnInit, inject } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService, SioCoreModalService } from '@silicia/core';
import { SioDatabaseService, SioDatabaseModule } from '@silicia/database';
import { SioChatState } from '../../store';
import { SioChatInterface } from '../../interfaces';
import { SioChatPage } from '../chat/chat.page';

import { languages } from './i18n';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sio-chats-page',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss'],
  standalone: true,
  imports: [SioCommonModule, SioDatabaseModule]
})
export class SioChatsPage {
  constructor(
    public sioChatState: SioChatState,
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabaseService: SioDatabaseService,
    private translateService: TranslateService,
    private sioCoreModalService: SioCoreModalService,
  ) {
    languages.forEach((lang: any) => {
      this.translateService.setTranslation(lang.key, lang.value, true);
    });
    this.sioChatState.setDatabaseId('demo');
    this.sioChatState.setCollectionId('6824f6c5002424ca7d81');
    this.sioChatState.load([this.sioDatabaseService.limit(25)]);
  }

  public async create() {
    this.sioCoreLoggerService.debug(`[SioChatPage]['create']`);
  }

  public async delete(event: any) {
    this.sioCoreLoggerService.debug('[SioChatPage][delete]', event.id);
    this.sioChatState.removeOne(event.id);
  }

  public archive(event: Event) {
    this.sioCoreLoggerService.log('you have right swiped ', event);
  }

  public load(event: Event): void {
    this.sioCoreLoggerService.debug('[SioChatPage][load]', event);
  }

  public openChat(event: Event): void {
    this.sioCoreLoggerService.debug('[SioChatListPage][openChat]', event);
    this.sioCoreModalService.create(SioChatPage).then(() => {
      this.sioCoreModalService.show()
    });

  }

  public refresh(event: Event): void {
    this.sioCoreLoggerService.debug('[SioChatPage][refresh]', event);
  }
}


