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
})
export class SioDatabaseListComponent implements OnInit {
  // input related to this component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public store: SioDatabaseState<any> | undefined = undefined;

  // Wrapped input for subcomponents

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

  @AttributeBoolean()
  @Input()
  public enableLeftSwipe: InputBoolean;

  @AttributeBoolean()
  @Input()
  public enableRightSwipe: InputBoolean = true;

  @Input() public header = 'name';
  @Input() public label = 'description';
  @Input() public icon: string | undefined;
  @Input() public avatar: string | undefined;
  @Input() public thumbnail: string | undefined;

  @Output() Click = new EventEmitter<Event>();
  @Output() LeftSwipe = new EventEmitter<Event>();
  @Output() RightSwipe = new EventEmitter<Event>();
  @Output() infinite = new EventEmitter<Event>();
  @Output() refresh = new EventEmitter<Event>();

  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.sioCoreLoggerService.debug('[SioDatabaseListComponent][constructor]');
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioDatabaseListComponent][ngOnInit]');
  }

  public onLeftSwipe(event: Event) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onLeftSwipe]',
      event,
    );
    this.LeftSwipe.emit(event);
  }
  public onRightSwipe(event: Event) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onRightSwipe]',
      event,
    );
    this.RightSwipe.emit(event);
  }

  public onRefresh(event: RefresherCustomEvent) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onRefresh]',
      event,
    );
    if (this.store) this.store.load();
    this.refresh.emit();
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 500);
  }

  public onInfinite(data: Event) {
    this.sioCoreLoggerService.debug(
      '[sioDatabaseListComponent][onInfinite]',
      data,
    );
    this.infinite.emit(); //{ LastId: this.store.entitiesArray.pop().$id });
    if (this.store) {
      this.store.setRemoteIndex('');
      this.store.load();
    }
    setTimeout(() => {
      (data as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
