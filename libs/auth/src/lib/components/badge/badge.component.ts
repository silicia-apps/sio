import { Component, Input } from '@angular/core';

import { Store, Select } from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { SioAuthState } from '../../store';
import { SioAuthUserInterface } from '../../interfaces';

import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sio-auth-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class SioAuthBadgeComponent {
  @Input() public type: 'default' | 'button' = 'default';
  @Input() public menu = 'user';
  @Input() public urlLoginPage = 'auth/login';
  @Input() public urlProfilePage = 'auth/profile';
  @Input() public urlNeedLogin = 'auth/403';
  @Input() public position: 'left' | 'right' = 'left';
  @Input() public shape: 'inset' | 'compact' = 'compact';
  @Input() public color = '';
  @Input() public icon = 'log-in';
  @Input() public detailIcon = 'chevron-down-outline';
  @Input() public text = 'LOGIN';
  @Input() public size: 'small' | 'large' = 'small';

  @Select(SioAuthState)
  public user$!: Observable<SioAuthUserInterface>;

  constructor(
    private store: Store,
    public sioAuthState: SioAuthState,
  ) {}

  logOut() {
    this.sioAuthState.logout();
  }

  goPage(url: string) {
    this.store.dispatch(new Navigate([url]));
  }
}
