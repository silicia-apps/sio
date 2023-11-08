import { Injectable } from '@angular/core';
import { Selector, StateToken } from '@ngxs/store';
import { SioCoreAppComponentStateModel } from './app.model';
import { SioCoreAppCompomentInterface } from '../../../interfaces';

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
import { SioSideMenuType } from '../../../types';

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
    this.patchState({ layout: { split: value } });
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
  get leftMenuID(): string | undefined {
    return this.snapshot.layout?.left_panel?.menu;
  }

  @Computed()
  get rightMenuID(): string | undefined {
    return this.snapshot.layout?.right_panel?.menu;
  }

  @Computed()
  get tabMenuID(): string | undefined {
    return this.snapshot.layout?.tab?.menu;
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
  get tab(): unknown {
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
    const layout = this.ctx.getState().layout;
    if (layout) layout.dark = true;
    console.error(JSON.stringify(layout));
    if (layout?.left_panel) { layout.left_panel.type = value }
   // else if (layout) layout.left_panel = { type : value }
    console.error('new '+ JSON.stringify(layout));
    this.ctx.patchState({ layout: layout });
  }

  @DataAction()
  setRightPanelType(value: SioSideMenuType) {
    this.ctx.patchState({ layout: { right_panel: { type: value } } });
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
  public async setDark(value: boolean) {
    const layout = this.ctx.getState().layout
      ? this.ctx.getState().layout
      : { dark: value };
    this.patchState({ layout: layout });
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
