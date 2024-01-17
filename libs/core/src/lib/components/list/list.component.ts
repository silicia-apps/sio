import { Component, OnInit, Input } from '@angular/core';
import { SioColorType } from '../../types';
import { SioCoreLoggerService } from '../../services/logger';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

@Component({
  selector: 'sio-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class SioCoreListComponent implements OnInit {
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
  @Input() public doLeftSwipe: InputBoolean;
  
  @AttributeBoolean()
  @Input() public doRightSwipe: InputBoolean;
  
  @Input() public header: string = 'name';
  @Input() public label: string = 'description';
  @Input() public icon: string | undefined;
  @Input() public avatar: string | undefined;
  @Input() public thumbnail: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public data: any[] | undefined;

  // @Output() public sioCoreMenuDidChange = new EventEmitter();

  //public sioCoreListState!: SioCoreListInterface;

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    //private _sioCoreListState: SioCoreListState
  ) {}

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[sioCoreListComponent][ngOnInit]');
    //this.sioCoreListState = this._sioCoreListState.snapshot[this.id];
    //this.sioCoreLoggerService.debug('[sioCoreListComponent][ngOnInit]', this.sioCoreListState);
  }

  /*public clic(url: string) {
    //this._sioCoreListState.go(url); 
  }*/

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //ionMenuDidChange(value: any) {
  //  this.sioCoreMenuDidChange.emit(value);
  //}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
