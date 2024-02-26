import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SioColorType } from '../../types';
import { SioCoreLoggerService } from '../../services/logger';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import { InfiniteScrollCustomEvent, RefresherCustomEvent } from '@ionic/angular';

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
  @Input() public enableInfinite: InputBoolean = false;
  
  @AttributeBoolean()
  @Input() public enableLeftSwipe: InputBoolean = false;
  
  @AttributeBoolean()
  @Input() public enableRightSwipe: InputBoolean = true;
  
  @Input() public header = 'name';
  @Input() public label = 'description';
  @Input() public icon: string | undefined;
  @Input() public avatar: string | undefined;
  @Input() public thumbnail: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public data: any[] | undefined;

  @Output() clickItem = new EventEmitter<Event>();
  @Output() leftSwipe  = new EventEmitter<Event>();
  @Output() rightSwipe = new EventEmitter<Event>();
  @Output() infinite = new EventEmitter<InfiniteScrollCustomEvent>();
  @Output() refresh = new EventEmitter<RefresherCustomEvent>();
  
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

  public onLeftSwipe(data: Event) {
    this.sioCoreLoggerService.debug('[sioCoreListItemComponent][receiveListLeftSwipe]', data);
    this.leftSwipe.emit(data);
  }
  public onRightSwipe(data: Event) {
    this.sioCoreLoggerService.debug('[sioCoreListItemComponent][receiveListRightSwipe]', data);
    this.rightSwipe.emit(data);
  }

  public onRefresh(event: RefresherCustomEvent) {
    this.sioCoreLoggerService.debug('[sioCoreListItemComponent][onRefresh]', event);
    this.refresh.emit(event);
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  public onInfinite(event: InfiniteScrollCustomEvent) {
    this.sioCoreLoggerService.debug('[sioCoreListItemComponent][receiveListInfinite]', event);
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
