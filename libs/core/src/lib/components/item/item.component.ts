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
  
  @Input() public set color(value: SioColorType) {
    //console.error(value);
    this._color = value?value:'none';
  }

  public get color() : SioColorType {
    //console.error(value);
    return this._color;
  }

  @Input() public header: string = 'NO_HEADER';
  @Input() public label: string = 'NO_LABEL';

  @AttributeBoolean()
  @Input() public button: InputBoolean = false;  

  @AttributeBoolean()
  @Input() public disabled: InputBoolean = false;  
  
  @Input() public thumbnail: string | undefined = undefined;
  @Input() public avatar: string | undefined = undefined;
  @Input() public icon: string | undefined = undefined;

  @AttributeBoolean()
  @Input() public doLeftSwipe: InputBoolean = false;
  
  @AttributeBoolean()
  @Input() public doRightSwipe: InputBoolean = false;
  
  @Input() public alt : string | undefined = undefined;
  
  @Output() sioCoreItemClick = new EventEmitter();
  @Output() sioCoreItemSwipe = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    
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
