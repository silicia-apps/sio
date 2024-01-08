import { Component, Input } from '@angular/core';
import { SioColorType } from '../../types';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

@Component({
  selector: 'sio-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class SioCoreCardComponent {
  @Input() public disabled = false;

  @AttributeBoolean()
  @Input() public accordion: InputBoolean = false;
  @Input() public lines: 'full' | 'inset' | 'none' = 'none';
  @Input() public value = '';
  //@Input() public shape: 'line' | 'dot' | 'rounded' = 'line';
  @Input() public position: 'left' | 'right' = 'left';
  @Input() public color: SioColorType;
  @Input() public toggleIconSlot: 'start' | 'end' = 'end';
  @Input() public toggleIcon = 'chevron-down-outline';
  @Input() public shape: 'compact' | 'inset' = 'compact';
  @Input() public title = '';
  @Input() public subtitle = '';
  @Input() public img: string | null = null;
  @Input() public altImg = 'Alternative Text for image';
  @Input() public type: 'standard' | 'media' | 'accordion' = 'standard';

  test() {
    console.log('test');
  }
}
