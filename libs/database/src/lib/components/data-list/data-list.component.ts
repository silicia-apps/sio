import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioCoreLoggerService, SioColorType } from '@silicia/core';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { SioDatabaseState } from '../../store';

@Component({
  selector: 'sio-datalist',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  standalone: false,
})
export class SioDatabaseListComponent implements OnInit {
  @Input() public store: SioDatabaseState<any> | undefined = undefined;

  @Input() public id = 'main';
  @Input() public lines: 'full' | 'inset' | 'none' = 'none';
  //@Input() public shape: 'line' | 'dot' | 'rounded' = 'line';
  @Input() public position: 'side' | 'bottom' | 'top' = 'side';
  @Input() public color: SioColorType;
  @Input() public toggleIconSlot: 'start' | 'end' = 'end';
  @Input() public toggleIcon = 'chevron-up-outline';
  @Input() public shape: 'compact' | 'inset' = 'compact';
  @Input() public style: 'default' | 'rounded' | 'custom' = 'default';
  @Input() public desktop = false;

  @AttributeBoolean()
  @Input()
  public enableInfinite: InputBoolean = false;

  @Input() public header = 'name';
  @Input() public label = 'description';
  @Input() public icon: string | undefined;
  @Input() public avatar: string | undefined;
  @Input() public thumbnail: string | undefined;

  @Input() public leftMenuId: string | undefined = undefined;
  @Input() public rightMenuId: string | undefined = undefined;

  @Output() sioOnClick = new EventEmitter<Event>();
  @Output() sioOnLeftSwipe = new EventEmitter<Event>();
  @Output() sioOnRightSwipe = new EventEmitter<Event>();
  @Output() sioOnInfinite = new EventEmitter<Event>();
  @Output() sioOnRefresh = new EventEmitter<Event>();

  constructor(private sioCoreLoggerService: SioCoreLoggerService) {}

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioDatabaseListComponent][ngOnInit]');
    if (this.store) {
      this.store.setRemoteIndex(0);
      this.store.load();
    }
  }

  public leftSwipe(event: Event) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][leftSwipe]',
      event,
    );
    this.sioOnLeftSwipe.emit(event);
  }
  public rightSwipe(event: Event) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][rightSwipe]',
      event,
    );
    this.sioOnRightSwipe.emit(event);
  }

  public refresh(event: CustomEvent) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][refresh]',
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
      '[sioDatabaseListComponent][infinite]',
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
}
