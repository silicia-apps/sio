import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { SioCoreLoggerService } from '../../services/logger';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import { SioColorType } from '../../types';


@Component({
  selector: 'sio-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class SioCoreItemComponent implements OnInit {

  private _color : SioColorType = undefined;
  
  @Input() public set color(value: SioColorType) {
    //console.error(value);
    this._color = value?value:'none';
  }

  public get color() : SioColorType {
    //console.error(value);
    return this._color;
  }

  @Input() public $id: string | number | undefined = undefined;
  @Input() public header = 'NO_HEADER';
  @Input() public label = 'NO_LABEL';

  @AttributeBoolean()
  @Input() public button: InputBoolean = false;  

  @AttributeBoolean()
  @Input() public disabled: InputBoolean = false;  
  
  @Input() public thumbnail: string | undefined = undefined;
  @Input() public avatar: string | undefined = undefined;
  @Input() public icon: string | undefined = undefined;

  @AttributeBoolean()
  @Input() public LeftSwipe: InputBoolean = false;
  
  @AttributeBoolean()
  @Input() public RightSwipe: InputBoolean = false;
  
  @Input() public alt : string | undefined = undefined;
  
  @Output() sioCoreItemClick = new EventEmitter<Record<string, number | string>>();
  @Output() sioCoreItemLeftSwipe = new EventEmitter<Record<string, number | string>>();
  @Output() sioCoreItemRightSwipe = new EventEmitter<Record<string, number | string>>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioCoreItemComponent][ngOnInit]');
  }

  public async doRightSwipe(slidingItem: IonItemSliding): Promise<void> {
    await slidingItem.closeOpened();
    this.sioCoreLoggerService.debug('[SioCoreItemComponent][doLeftSwipe] You have left swiped', this.$id);
    this.sioCoreItemRightSwipe.emit({id: this.$id!});
  }

  public async doLeftSwipe(slidingItem: IonItemSliding): Promise<void> {
    await slidingItem.closeOpened();
    this.sioCoreLoggerService.debug('[SioCoreItemComponent][doLeftSwipe] You have left swiped', this.$id);
    this.sioCoreItemLeftSwipe.emit({ id: this.$id!}); 
  }

  public async Click(): Promise<void> {
    this.sioCoreLoggerService.info(
      '[SioCoreMenuItemComponent][Click] raise event click'
    );
    this.sioCoreItemClick.emit({ id: this.$id!});
  }
}
