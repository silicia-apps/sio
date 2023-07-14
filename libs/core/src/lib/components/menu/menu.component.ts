import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SioColorType } from '../../shared/shared.type';
import { SioCoreMenuInterface } from './store/menu.interface';
import { SioCoreMenuState } from './store/menu.state';
import { SioCoreLoggerService } from '../../services/logger';

@Component({
  selector: 'sio-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class SioCoreMenuComponent implements OnInit {
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

  @Output() public sioCoreMenuDidChange = new EventEmitter();
  @Output() public sioCoreMenuWillChange = new EventEmitter();

  public sioCoreMenuState!: SioCoreMenuInterface;

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private _sioCoreMenuState: SioCoreMenuState
  ) { }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[sioCoreMenuComponent][ngOnInit]');
    this.sioCoreMenuState = this._sioCoreMenuState.snapshot[this.id];
    this.sioCoreLoggerService.debug('[sioCoreMenuComponent][ngOnInit]', this.sioCoreMenuState);
  }

  public clic(url: string) {
    this._sioCoreMenuState.go(url);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ionMenuDidChange(value: any) {
    this.sioCoreMenuDidChange.emit(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ionMenuWillChange(value: any) {
    this.sioCoreMenuWillChange.emit(value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}