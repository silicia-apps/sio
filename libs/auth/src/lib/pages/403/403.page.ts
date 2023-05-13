import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'sio-auth-403-page',
  templateUrl: './403.page.html',
  styleUrls: ['./403.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SioAuth403Page implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    console.log('[Auth/Pages/Login] Init Page');
  }

  goLogin() {
    this.store.dispatch(new Navigate(['/auth/login']));
  }
}
