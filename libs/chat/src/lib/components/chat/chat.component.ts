import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioChatMessageComponent } from '../message';

import {
  SioCoreLoggerService,
  SioColorType,
  SioCommonModule,
} from '@silicia/core';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { SioDatabaseState, SioDatabaseService } from '@silicia/database';
import { SioChatComponentStateModel } from './store/chat.model';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SioChatState } from './store';

@Component({
  selector: 'sio-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, SioCommonModule, SioChatMessageComponent],
  standalone: true,
})
export class SioChatComponent implements OnInit {
  @Input() public id: string | undefined;

  public storeMessages: SioChatComponentStateModel[] = [];
  public store: SioDatabaseState<SioChatComponentStateModel> | undefined;

  @AttributeBoolean()
  @Input()
  public enableInfinite: InputBoolean;

  @Output() sioOnClick = new EventEmitter<Event>();
  @Output() sioOnInfinite = new EventEmitter<Event>();
  @Output() sioOnRefresh = new EventEmitter<Event>();

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabaseService: SioDatabaseService,
    public sioChatState: SioChatState,
  ) {
    this.sioCoreLoggerService.debug('[SioChatComponent][constructor]');
    this.sioChatState.setDatabaseId('demo');
    this.sioChatState.setCollectionId('68189e8a00241e559889');
    this.sioChatState.load([this.sioDatabaseService.limit(1)]);
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioChatComponent][ngOnInit]');
    if (this.sioChatState) {
      this.sioChatState.setRemoteIndex(0);
      this.sioChatState.load([
        this.sioDatabaseService.equal('$id', this.id as string),
      ]);
      this.enableInfinite =
        this.sioChatState.localTotals < this.sioChatState.remoteTotals;
    }
  }

  public refresh(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatComponent][refresh]', event);
    if (this.store) {
      this.store.setRemoteIndex(0);
      this.store.load();
    }
    this.sioOnRefresh.emit();
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 500);
  }

  public infinite(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatComponent][infinite]', event);
    if (this.store) {
      this.store.load();
    }
    this.sioOnInfinite.emit(event);
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  public load(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatComponent][load]', event);
  }
}
