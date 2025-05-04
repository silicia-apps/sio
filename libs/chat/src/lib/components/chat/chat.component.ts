import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioChatMessageComponent } from '../message';
import { SioCoreLoggerService, SioColorType, SioCommonModule } from '@silicia/core';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { Query, SioDatabaseState } from '@silicia/database';
import { SioChatComponentStateModel } from './store/chat.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sio-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [CommonModule, SioCommonModule,SioChatMessageComponent],
    standalone: true
})
export class SioChatComponent implements OnInit {
  
  @Input() public chatId: string | undefined; 
  
  public storeMessages: SioChatComponentStateModel[] = []; 
  public store: SioDatabaseState<SioChatComponentStateModel> | undefined;

  @AttributeBoolean()
  @Input() public enableInfinite: InputBoolean ;
  
  @Output() sioOnClick = new EventEmitter<Event>();
  @Output() sioOnInfinite = new EventEmitter<Event>();
  @Output() sioOnRefresh = new EventEmitter<Event>();

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
  ) {
    this.sioCoreLoggerService.debug('[SioChatComponent][constructor]');
    
  }
  
  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioChatComponent][ngOnInit]');
    if (this.store) {
      this.store.setRemoteIndex(0);
      this.store.load([Query.equal('$id', this.chatId!)]);
      this.enableInfinite = this.store.localTotals < this.store.remoteTotals;
    }
  }


  public refresh(event: CustomEvent) {
    this.sioCoreLoggerService.debug(
      '[SioChatComponent][refresh]',
      event,
    );
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
    this.sioCoreLoggerService.debug(
      '[SioChatComponent][infinite]',
      event,
    );
    if (this.store) {
      this.store.load();
    }
    this.sioOnInfinite.emit(event);
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  public load(event: CustomEvent) {
    this.sioCoreLoggerService.debug(
      '[SioChatComponent][load]',
      event,
    );
  }
}
