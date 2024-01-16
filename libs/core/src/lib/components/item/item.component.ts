import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  @Input() public label: string;
  
  @Input() public image: string;

  @Input() public set color(value: string) {
    //console.error(value);
    this._color = value?value:'none';
  }

  public get color() : SioColorType {
    //console.error(value);
    return this._color;
  }

  @Input() public header: string;

  @AttributeBoolean()
  @Input() public button: InputBoolean;  

  @AttributeBoolean()
  @Input() public disabled: InputBoolean;  
  
  @AttributeBoolean()
  @Input() public thumbnail: InputBoolean;

  @AttributeBoolean()
  @Input() public avatar: InputBoolean;

  @AttributeBoolean()
  @Input() public doLeftSwipe: InputBoolean;
  
  @AttributeBoolean()
  @Input() public doRightSwipe: InputBoolean;
  
  @Input() public alt : string | undefined = undefined;
  
  @Output() sioCoreItemClick = new EventEmitter();
  @Output() sioCoreItemSwipe = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.disabled = false;
    this.avatar = false;
    this.thumbnail = false;
    this.label = 'no label';
    this.header = 'no header';
    this.image = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
    console.log(this.label)
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioCoreItemComponent][ngOnInit]');
  }

  public async RightSwipe(): Promise<void> {
    this.sioCoreLoggerService.info(
      '[SioCoreItemComponent][RightSwipe] raise event swipe'
    );
    this.sioCoreItemSwipe.emit();
  }

  public async LeftSwipe(): Promise<void> {
    this.sioCoreLoggerService.info(
      '[SioCoreItemComponent][LeftSwipe] raise event swipe'
    );
    this.sioCoreItemSwipe.emit();
  }

  public async Click(): Promise<void> {
    this.sioCoreLoggerService.info(
      '[SioCoreMenuItemComponent][Click] raise event click'
    );
    this.sioCoreItemClick.emit();
  }
}
