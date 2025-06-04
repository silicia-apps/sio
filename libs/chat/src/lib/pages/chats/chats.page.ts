import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService, SioCoreModalService } from '@silicia/core';
import { SioDatabaseService, SioDatabaseModule } from '@silicia/database';
import { SioChatState } from '../../store';
import { languages } from './i18n';
import { TranslateService } from '@ngx-translate/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionType } from '@ngxs/store';
import { MomentModule } from 'ngx-moment';


@Component({
  selector: 'sio-chats-page',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss'],
  standalone: true,
  imports: [SioCommonModule, SioDatabaseModule, MomentModule]
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
    this.sioChatState.setDatabaseId('6817a6cc0008ab4f96fb');
    this.sioChatState.setCollectionId('683d7afc001fac5c00bc');
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
    this.sioChatState.dispatch(new Navigate(['/chat']) as unknown as ActionType);
  }

  public refresh(event: Event): void {
    this.sioCoreLoggerService.debug('[SioChatPage][refresh]', event);
  }
}


