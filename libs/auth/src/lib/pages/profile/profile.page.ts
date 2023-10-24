import { Component } from '@angular/core';
import { SioCoreLoggerService } from '@silicia/core';

import { SioAuthState } from '../../store';

@Component({
  selector: 'sio-auth-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class SioAuthProfilePageComponent {
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioAuthState: SioAuthState
  ) {}

  async logout() {
    this.sioCoreLoggerService.info(
      '[SioAuthProfilePageComponent][logout] Dispatch logout action'
    );
    await this.sioAuthState.logout();
  }
}
