import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SioCoreMenuInterface } from '../../interfaces';
import { SioCoreMenuState } from '../menu/store';
import { SioCoreAppComponentState } from '../app/store';
import { Loggable, SioCoreLoggerService } from '../../services/logger';
import { Nullable } from '@angular-ru/cdk/typings';

@Loggable()
@Component({
    selector: 'sio-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    standalone: false
})
export class SioCoreTabComponent implements OnInit {
  @Input() public tabID: string;
  @Input() public position: any; //'top' | 'bottom' = 'bottom';
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
    private sioCoreMenuState$: SioCoreMenuState,
    public sioCoreAppComponentState: SioCoreAppComponentState,
  ) {
    this.sioCoreLoggerService.debug(`[sioCoreTabComponent][constructor]`);
    this.tabID = 'main';
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
    this.sioCoreMenuState = this.sioCoreMenuState$.snapshot[this.tabID];
    console.log(this.sioCoreMenuState);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
