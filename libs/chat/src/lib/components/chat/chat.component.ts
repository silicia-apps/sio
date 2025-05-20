import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioChatMessageComponent } from '../message';

import {
  SioCoreLoggerService,
  SioCommonModule,
} from '@silicia/core';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { SioDatabaseState, SioDatabaseService } from '@silicia/database';
import { SioChatStateModel, SioChatState } from '../../store';
import { CommonModule } from '@angular/common';
import { NgxsOnInit, StateContext } from '@ngxs/store';

@Component({
  selector: 'sio-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, SioCommonModule, SioChatMessageComponent],
  standalone: true,
})
export class SioChatComponent implements OnInit, NgxsOnInit {
  @Input() public id: string | undefined;

  public SioChatState: SioDatabaseState<SioChatStateModel> | undefined;

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
    if (this.id) {
      this.sioCoreLoggerService.debug('[SioChatComponent][constructor]');
    }
    
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    this.sioCoreLoggerService.debug('[SioChatComponent][ngxsOnInit]', ctx);
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioChatComponent][ngOnInit]');
    if (this.sioChatState) {
      this.sioChatState.setDatabaseId('demo');
      this.sioChatState.setCollectionId('6824f6c5002424ca7d81');
      this.sioChatState.setRemoteIndex(0);
      this.sioChatState.load();


      this.enableInfinite =
        this.sioChatState.localTotals < this.sioChatState.remoteTotals;
    }
  }

  public refresh(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatComponent][refresh]', event);
    if (this.sioChatState) {
      this.sioChatState.setRemoteIndex(0);
      this.sioChatState.load();
    }
    this.sioOnRefresh.emit();
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 500);
  }

  public infinite(event: CustomEvent) {
    this.sioCoreLoggerService.debug('[SioChatComponent][infinite]', event);
    if (this.sioChatState) {
      this.sioChatState.load();
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
