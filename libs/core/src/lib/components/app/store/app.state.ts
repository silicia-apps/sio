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
import { SioCorePageComponentState } from '../../page';
import { SioSideMenuType } from '../../../interfaces';

const APP_STATE_TOKEN = new StateToken<SioCoreAppComponentStateModel>('app');

@StateRepository()
@State<SioCoreAppComponentStateModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    language: {
      avaibles: ['en'],
      default: 'en',
      fallback: 'en',
    },
    layout: {
      split: false,
      dark: false,
      left_panel: {
        type: 'none',
        menu: undefined,
      },
      right_panel: {
        type: 'none',
        menu: undefined,
      },
      tab: {
        desktop: 'none',
        mobile: 'bottom',
        menu: undefined,
      },
    },
    title: 'APP_TITLE',
    routes: {
      login: '/auth/login',
      redirectTo: '/',
    },
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
    return state.layout?.dark;
  }

  @Selector()
  static error(state: SioCoreAppComponentStateModel) {
    return state.errors;
  }

  @Computed()
  get split(): boolean {
    return this.snapshot.layout?.split || false;
  }

  @DataAction()
  setSplit(value: boolean) {
    this.patchState({ layout: { split: value }});
  }

  @Computed()
  get currentLanguage() {
    return this.snapshot.language?.default;
  }

  @Computed()
  get leftPanelType(): SioSideMenuType {
    return this.snapshot.layout?.left_panel?.type;
  }

  @Computed()
  get rightPanelType(): SioSideMenuType {
    return this.snapshot.layout?.right_panel?.type;
  }

  @Computed()
  get full(): boolean {
    return this.snapshot.layout?.full || false;
  }

  @Computed()
  get darkmode(): boolean {
    return this.snapshot.layout?.dark || false;
  }

  @Computed()
  get tab(): any {
    return this.snapshot.layout?.tab;
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
  setLeftPanelType(value: SioSideMenuType) {
    this.ctx.patchState({ layout : { left_panel : { type : value }}});
  }

  @DataAction()
  setRightPanelType(value: SioSideMenuType) {
    this.ctx.patchState({ layout : { right_panel : { type : value }}});
  }

  @DataAction()
  public SetFullmode(value: boolean) {
    this.patchState({
      layout: { full: value },
    });
  }

    /*@DataAction()
  SetStyle(@Payload('style') value: number): void {
    this.patchState({
      style: value,
    });
  }*/

  @DataAction()
  public set dark(value: boolean) {
    this.patchState({ layout: { dark: value } });
  }

  

  @DataAction()
  public async ShowLoading(message = 'WAITING') {
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
    name = 'sio-error',
    // eslint-disable-next-line @typescript-eslint/ban-types
    action: Function = (): null => {
      return null;
    },
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
