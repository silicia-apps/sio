import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SioColorType } from '../../types';
import { InputBoolean } from '@angular-ru/cdk/typings';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { SioCoreLoggerService } from '../../services';

import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'sio-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
})
export class SioCoreButtonComponent {
  @Input() public color: SioColorType;

  @Input() public type: 'button' | 'fab' = 'button';

  @AttributeBoolean()
  @Input()
  public round: InputBoolean;

  @AttributeBoolean()
  @Input()
  public upload: InputBoolean = false;

  @Input() public size: 'default' | 'large' | 'small' | undefined = undefined;

  @Input() public display_icon: 'left' | 'right' | 'only' = 'left';

  @Input() public icon: string | undefined = undefined;

  @AttributeBoolean()
  @Input()
  public full: InputBoolean = false;

  @AttributeBoolean()
  @Input()
  public block: InputBoolean = false;

  @AttributeBoolean()
  @Input()
  public disabled: InputBoolean = false;

  @Output() Click = new EventEmitter();

  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.sioCoreLoggerService.debug('[SioCoreButtonComponent][constructor]');
  }

  async onClick() {
    if (this.upload) {
      const { files } = await FilePicker.pickFiles({ readData: true });
      if (files) this.Click.emit(files);
    } else {
      this.Click.emit([]);
    }
  }
}
