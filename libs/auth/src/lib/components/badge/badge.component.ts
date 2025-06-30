import { Component, inject, Input, Signal } from '@angular/core';

import { Store } from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { SioAuthState } from '../../store';
import { SioCoreMenuState } from '@silicia/core';
import { SioAuthUserInterface } from '../../interfaces';

import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { languages } from './i18n';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'sio-auth-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    // eslint-disable-next-line @angular-eslint/prefer-standalone
    standalone: false
})
export class SioAuthBadgeComponent {
  @Input() public type: 'default' | 'button' = 'default';
  @Input() public menu = 'user';
  @Input() public urlLoginPage = 'auth/login';
  @Input() public urlProfilePage = 'auth/profile';
  @Input() public urlNeedLogin = 'auth/403';
  @Input() public position: 'left' | 'right' = 'left';
  @Input() public shape: 'inset' | 'compact' = 'compact';
  @Input() public color = 'none';
  @Input() public icon = 'log-in';
  @Input() public detailIcon = 'chevron-down-outline';
  @Input() public text = 'LOGIN';
  @Input() public size: 'small' | 'large' = 'small';

  public user: Signal<SioAuthUserInterface> = this.store.selectSignal(SioAuthState.user);
  
  constructor(
    private store: Store,
    public sioAuthState: SioAuthState,
    private translateService: TranslateService,
    private sioCoreMenuState: SioCoreMenuState,
  ) {
    languages.forEach((lang) => {
      this.translateService.setTranslation(lang.key, lang.value, true);
    });
  }

  logOut() {
    this.sioAuthState.logout();
  }

  goPage(url: string) {
    this.store.dispatch(new Navigate([url]));
  }

  async test() {
      this.sioCoreMenuState.addOne({
        id: 'badge',
        items: {
          1: { id: 1, icon: 'profile', url: '/auth/profile' },
          2: { id: 2, icon: 'exit', url: '/auth/logout' },
        },
      });
  }
}
