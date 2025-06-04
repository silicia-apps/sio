import { Component, Input } from '@angular/core';
import { IonAvatar } from '@ionic/angular/standalone';
import { SioColorType } from '../../types';
import { SioCoreLoggerService } from '../../services/logger';

@Component({
  selector: 'sio-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false
})
export class SioCoreAvatarComponent {
  @Input() public url: string | undefined = undefined;
  @Input() set name(value: string) {
    this._name = value;
    if (!this.url) {
      this.url = `https://avatar.iran.liara.run/username?username=${value}`;
    }
  };

  private _name: string | undefined;

  constructor(
    private sioLoggerService: SioCoreLoggerService,
  ) {
    this.sioLoggerService.debug('[SioCoreAvatarComponent][constructor]');
  }
}
