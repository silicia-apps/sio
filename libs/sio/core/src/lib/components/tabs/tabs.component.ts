import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SioCoreMenuState, SioCoreMenuInterface } from '../menu/store';
import { Loggable, SioCoreLoggerService } from '../../services/logger';
import { Nullable } from '@angular-ru/cdk/typings';

@Loggable()
@Component({
  selector: 'sio-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class SioCoreTabsComponent implements OnInit {
  @Input() public id: string;
  @Input() public position: 'top' | 'bottom' | 'side' = 'bottom';
  @Input() public style: 'default' | 'reiner' = 'default';
  @Input() public color:
    | 'danger'
    | 'dark'
    | 'light'
    | 'medium'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | (string & Record<never, never>)
    | undefined;

  @Output() public sioCoreTabsDidChange = new EventEmitter();
  @Output() public sioCoreTabsWillChange = new EventEmitter();

  public sioCoreMenuState: Nullable<SioCoreMenuInterface>;

  public tab_icon: string | undefined;

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioCoreMenuState$: SioCoreMenuState
  ) {
    this.id = 'main';
    this.color = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ionTabsDidChange(value: any) {
    this.sioCoreTabsDidChange.emit(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ionTabsWillChange(value: any) {
    this.sioCoreTabsWillChange.emit(value);
  }

  ngOnInit(): void {
    this.sioCoreMenuState = this.sioCoreMenuState$.snapshot[this.id];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
