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
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class SioDatabaseListComponent implements OnInit {
  // input related to this component
  @Input() public store: SioDatabaseState<never> | undefined = undefined;

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
  public infinite: InputBoolean = false;

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

  @Output() Click = new EventEmitter<Record<string, number | string>>();
  @Output() LeftSwipe = new EventEmitter<Record<string, number | string>>();
  @Output() RightSwipe = new EventEmitter<Record<string, number | string>>();
  @Output() Infinite = new EventEmitter<Record<string, number | string>>();
  @Output() Refresh = new EventEmitter<Record<string, number | string>>();

  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.sioCoreLoggerService.debug('[SioDatabaseListComponent][constructor]');
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioDatabaseListComponent][ngOnInit]');
  }

  public onLeftSwipe(data: Record<string, number | string>) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onLeftSwipe]',
      data,
    );
    this.LeftSwipe.emit(data);
  }
  public onRighSwipe(data: Record<string, number | string>) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onRightSwipe]',
      data,
    );
    this.RightSwipe.emit(data);
  }

  public onRefresh(data: Event) {
    this.sioCoreLoggerService.debug(
      '[SioDatabaseListComponent][onRefresh]',
      data,
    );
    if (this.store) this.store.load();
    this.Refresh.emit();
    setTimeout(() => {
      (data as RefresherCustomEvent).target.complete();
    }, 500);
  }

  public onInfinite(data: Event) {
    this.sioCoreLoggerService.debug(
      '[sioDatabaseListComponent][onInfinite]',
      data,
    );
    this.Infinite.emit({ LastId: this.store!.pop().$id });
    if (this.store) {
      this.store.setRemoteIndex('');
      this.store.load();
    }
    setTimeout(() => {
      (data as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
