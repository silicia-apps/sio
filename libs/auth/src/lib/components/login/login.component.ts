import { Component, Input } from '@angular/core';
import { SioAuthState } from '../../store';
import { SioCoreLoggerService, SioCoreFormComponentInputInterface } from '@silicia/core';
import { SioAuthLoginComponentState } from './store/login.state';
import { Navigate } from '@ngxs/router-plugin';
import { Loggable } from '@silicia/core';
import { ActionType } from '@ngxs/store';
import { SioColorType } from '@silicia/core';

import { it } from './i18n/it';
import { TranslateService } from '@ngx-translate/core';


@Loggable()
@Component({
    //standalone: true,
    selector: 'sio-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class SioAuthLoginComponent {
  private _mode: 'signup' | 'signin' = 'signin';

  public layout: SioCoreFormComponentInputInterface[] = [];

  @Input()
  public social = false;

  @Input()
  public set mode(value: 'signup' | 'signin') {
    this._mode = value;
  }

  @Input()
  public color : SioColorType;

  constructor(
    private sioAuthState: SioAuthState,
    private sioCoreLoggerService: SioCoreLoggerService,
    private translateService: TranslateService,
    public sioAuthLoginComponentState: SioAuthLoginComponentState
  ) {
    this.sioCoreLoggerService.debug(`[SioAuthLoginComponent][constructor]`);
    this.sioCoreLoggerService.debug(`[SioAuthLoginComponent][constructor] Load Translations`);
    this.translateService.setTranslation('it', it, true);
  }

  async login() {
    this.sioCoreLoggerService.debug('[SioAuthLoginComponent][login]', this.sioAuthLoginComponentState.username, this.sioAuthLoginComponentState.password);
    if (
      await this.sioAuthState.loginWithCredentials(
        this.sioAuthLoginComponentState.username,
        this.sioAuthLoginComponentState.password
      )
    )
      this.sioAuthState.dispatch(
        new Navigate([
          this.sioAuthState.snapshot.routes.redirectTo,
        ]) as unknown as ActionType
      );
  }

  async oAuth2Login(provider: string) {
    this.sioCoreLoggerService.debug('[SioAuthLoginComponent][oAuth2Login]',provider);
    this.sioAuthState.oAuth2Login(provider);
  }
}
