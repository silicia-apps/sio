import { Component, Input } from '@angular/core';
import { SioColorType } from '../../shared/shared.type';
import { SioCoreLoggerService } from '../../services/logger';

@Component({
  selector: 'sio-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class SioCoreIconComponent {
  @Input() public color: SioColorType;
  @Input() public name: string | undefined = undefined;
  @Input() public url: string | undefined = undefined;
  @Input() public size: 'small' | 'large' | undefined = undefined;
  @Input() public only = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private sioLoggerService: SioCoreLoggerService,
  ) {
    this.sioLoggerService.debug('[SioCoreIconComponent] Create Icon' + this.name, this.name);
  }
}
