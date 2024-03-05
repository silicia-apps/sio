import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { SioCoreLoggerService } from '../../services/logger';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import { SioColorType } from '../../types';
import { SioCoreMenuInterface, SioCoreMenuState } from '../../store';

@Component({
  selector: 'sio-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class SioCoreItemComponent implements OnInit {
  private _color: SioColorType = undefined;

  @Input() public set color(value: SioColorType) {
    //console.error(value);
    this._color = value ? value : 'none';
  }

  public get color(): SioColorType {
    //console.error(value);
    return this._color;
  }

  @Input() public $id: string | number | undefined = undefined;

  private _header = 'NO_HEADER';
  private _label = 'NO_LABEL';
  @Input() public set header(value: string) {
    if (Date.parse(value)) {
      console.log('test' + value);
      this._header = new Date(value).toLocaleString();
    } else {
      this._header = value;
    }
  }

  get header(): string {
    return this._header;
  }

  @Input()
  public leftMenuId: string | undefined = undefined;
  @Input()
  public rightMenuId: string | undefined = undefined;

  @Input() public set label(value: string) {
    if (Date.parse(value)) {
      this._label = new Date(value).toLocaleString();
    } else {
      this._label = value;
    }
  }

  get label(): string {
    return this._label;
  }

  @AttributeBoolean()
  @Input()
  public button: InputBoolean = false;

  @AttributeBoolean()
  @Input()
  public disabled: InputBoolean = false;

  @Input() public thumbnail: string | undefined = undefined;
  @Input() public avatar: string | undefined = undefined;
  @Input() public icon: string | undefined = undefined;

  @Input() public alt: string | undefined = undefined;

  @Output() sioOnClick = new EventEmitter<Event>();
  @Output() sioOnLeftSwipe = new EventEmitter<Event>();
  @Output() sioOnRightSwipe = new EventEmitter<Event>();

  public sioCoreLeftMenuState: SioCoreMenuInterface;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    public sioCoreMenuState: SioCoreMenuState) {
      this.sioCoreLeftMenuState = this.sioCoreMenuState.snapshot[(this.leftMenuId === undefined)?'main':this.leftMenuId];
    }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioCoreItemComponent][ngOnInit]');
    
  }

  public async rightSwipe(
    event: CustomEvent,
    slidingItem: IonItemSliding,
  ): Promise<void> {
    await slidingItem.closeOpened();
    event.detail.id = this.$id;
    this.sioCoreLoggerService.debug(
      '[SioCoreItemComponent][rightSwipe] You have left swiped',
      event,
    );
    this.sioOnRightSwipe.emit(event);
  }

  public async leftSwipe(
    event: CustomEvent,
    slidingItem: IonItemSliding,
  ): Promise<void> {
    await slidingItem.closeOpened();
    event.detail.id = this.$id;
    this.sioCoreLoggerService.debug(
      '[SioCoreItemComponent][leftSwipe] You have left swiped',
      event,
    );
    this.sioOnLeftSwipe.emit(event);
  }

  public async click(event: CustomEvent): Promise<void> {
    event.detail.id = this.$id;
    this.sioCoreLoggerService.info(
      '[SioCoreItemComponent][click] raise event click',
      event,
    );
    this.sioOnClick.emit(event);
  }
}
