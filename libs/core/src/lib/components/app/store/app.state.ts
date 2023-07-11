import { Injectable } from '@angular/core';
import { Selector, StateToken } from '@ngxs/store';
import { SioCoreAppComponentStateModel } from './app.model';
import { SioCoreAppCompomentInterface } from '../app.interface';

import { State } from '@ngxs/store';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { SioCoreMenuState } from '../../menu/store/menu.state';
import { SioCoreTabsState } from '../../tabs/store/tabs.state';
import { SioCorePageComponentState } from '../../page'
import { SioSideMenuType } from '../../../shared/shared.type';

const APP_STATE_TOKEN = new StateToken<SioCoreAppComponentStateModel>('app');

@StateRepository()
@State<SioCoreAppComponentStateModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    'title': 'APP_TITLE',
    'dark': false,
    'sidemenu': 'overlay',
    'fullmode': false,
    urls: {
      login: '/auth/login',
      redirectTo: '/',
    },
    menu: undefined,
    tabs: undefined,
    style: 3,
    split: false,
    loading: { show: false, message: '' },
  } as SioCoreAppComponentStateModel,
  children: [SioCoreMenuState, SioCoreTabsState, SioCorePageComponentState],
})
@Injectable()
export class SioCoreAppComponentState extends NgxsDataRepository<SioCoreAppComponentStateModel> {
  
  @Selector()
  static loading(state: SioCoreAppComponentStateModel) {
    return state.loading;
  }

  @Selector()
  static darkmode(state: SioCoreAppComponentStateModel) {
    return state.dark;
  }

  @Selector()
  static split(state: SioCoreAppComponentStateModel) {
    return state.split;
  }

  @Selector()
  static error(state: SioCoreAppComponentStateModel) {
    return state.errors;
  }

  @DataAction()
  LoadConfig(value: SioCoreAppCompomentInterface): void {
    this.ctx.patchState(value);
  }

  @DataAction()
  SetTitle(value: string): void {
    this.patchState({
      title: value,
    });
  }

  @DataAction()
  public SetFullmode(value: boolean) {
    this.patchState({
      fullmode: value,
    });
  }

  @DataAction()
  public setSidemenu(value: SioSideMenuType) {
    this.patchState({
      sidemenu: value,
    });
  }

  @Computed()
  get sidemenu(): SioSideMenuType {
    return this.snapshot.sidemenu;
  }

  @Computed()
  get fullmode(): boolean {
    return this.snapshot.fullmode as boolean;
  }


  /*@DataAction()
  SetStyle(@Payload('style') value: number): void {
    this.patchState({
      style: value,
    });
  }*/

  @Computed()
  get darkmode(): boolean {
    return this.snapshot.dark || false;
  }

  @DataAction()
  public setDark(value: boolean) {
    this.patchState({ dark: value });
  }

  @DataAction()
  public setSplit(value: boolean) {
    this.patchState({ split: value });
  }

  @DataAction()
  public async ShowLoading(message: string = 'WAITING') {
    if (message) {
      this.ctx.patchState({
        loading: { show: true, message: message },
      });
    }
  }

  @DataAction()
  public async HideLoading() {
    this.ctx.patchState({ loading: { show: false, message: undefined } });
  }

  @DataAction()
  public async throwError(
    message: string,
    name: string = 'sio-error',
    // eslint-disable-next-line @typescript-eslint/ban-types
    action: Function = (): null => {
      return null;
    }
  ): Promise<void> {
    this.patchState({
      errors: {
        name: name,
        message: message,
        action: action,
      },
    });
  }
}
