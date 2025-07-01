import { Component, input } from '@angular/core';
import { SioColorType } from '../../types';
import { IonIcon } from '@ionic/angular/standalone';
import { SioCoreLoggerService } from '../../services/logger';

@Component({
  selector: 'sio-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  providers: [SioCoreLoggerService],
  imports: [IonIcon],
  standalone: true,
})
export class SioCoreIconComponent {
  public color = input<SioColorType>();
  public slot = input<'start' | 'end' | 'icon-only'>();
  public name = input<string>();
  public url = input<string>();
  public size = input<'small' | 'large'>();
  public only = input<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioLoggerService: SioCoreLoggerService) {
    this.sioLoggerService.debug(
      '[SioCoreIconComponent] Create Icon' + this.name,
      this.name,
    );
  }
}
