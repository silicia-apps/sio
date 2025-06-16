import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioChatMessageComponent } from '../message';
import { SioChatMessageDividerComponent } from '../message-divider';
import { SioCoreEnvironmentService } from '@silicia/core';

import { SioCoreLoggerService, SioCommonModule } from '@silicia/core';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { SioDatabaseState, SioDatabaseService } from '@silicia/database';

import { NgxsOnInit, StateContext } from '@ngxs/store';
import { SioChatMessageState} from './store';

export interface SioChatConfigInterface {
  database_id?: string;
  collection_rooms_id: string;
  collection_messages_id: string;
  collection_profiles_id: string;
}

@Component({
  selector: 'sio-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [
    SioCommonModule,
    SioChatMessageComponent,
    SioChatMessageDividerComponent
],
  standalone: true,
})
export class SioChatRoomComponent implements OnInit, NgxsOnInit {
  @Input() public id: string | undefined;

  public isPageScrolling = false;
  //protected sioChatMessageState!: SioDatabaseState<SioChatMessageStateModel>;

  public _last_sender: 'me' | 'other' = 'me';
  public lastDay: string = '2007-04-13';

  @AttributeBoolean()
  @Input()
  public enableInfinite: InputBoolean;

  @Output() sioOnClick = new EventEmitter<Event>();
  @Output() sioOnInfinite = new EventEmitter<Event>();
  @Output() sioOnRefresh = new EventEmitter<Event>();

  private config: SioChatConfigInterface;
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioCoreEnvironmentService: SioCoreEnvironmentService,
    private sioDatabaseService: SioDatabaseService,
    public sioChatMessageState: SioChatMessageState,
  ) {
    this.config =
      this.sioCoreEnvironmentService.config.other &&
        (
          this.sioCoreEnvironmentService.config.other as {
            chat?: SioChatConfigInterface;
          }
        ).chat
        ? (
          this.sioCoreEnvironmentService.config.other as {
            chat: SioChatConfigInterface;
          }
        ).chat
        : { collection_messages_id: '', collection_profiles_id: '', collection_rooms_id: '' };

    if (this.id) {
      this.sioCoreLoggerService.debug(
        '[SioChatRoomComponent][constructor] get config',
        this.config,
      );
    }
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    this.sioCoreLoggerService.debug('[SioChatRoomComponent][ngxsOnInit]', ctx);
  }

  async trackBy(index: number, message: any) {
    return index;
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioChatRoomComponent][ngOnInit]');
    if (this.config) {
      this.sioChatMessageState.setDatabaseId(
        this.config.database_id!
      );
      this.sioChatMessageState.setCollectionId(this.config.collection_messages_id);
      this.sioChatMessageState.setRemoteIndex(0);
      this.sioChatMessageState.load([this.sioDatabaseService.equal('chatId', this.id!)]);

      this.enableInfinite =
        this.sioChatMessageState.localTotals < this.sioChatMessageState.remoteTotals;
    }
  }

  public refresh(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatRoomComponent][refresh]', event);
    if (this.sioChatMessageState) {
      this.sioChatMessageState.setRemoteIndex(0);
      this.sioChatMessageState.load();
    }
    this.sioOnRefresh.emit();
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 500);
  }

  public infinite(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatRoomComponent][infinite]', event);
    if (this.sioChatMessageState) {
      this.sioChatMessageState.load();
    }
    this.sioOnInfinite.emit(event);
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  public load(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatRoomComponent][load]', event);
  }
}
