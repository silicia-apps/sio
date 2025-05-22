/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Injectable } from '@angular/core';
import { Selector, StateToken } from '@ngxs/store';
import { SioCoreAppComponentStateModel } from './app.model';
import { SioCoreAppCompomentInterface } from '../../../interfaces';

import { State } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { SioCoreMenuState } from '../../menu/store/menu.state';
import { SioCoreTabsState } from '../../tab/store/tabs.state';
import { SioCorePagesComponentState } from '../../page';
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
        mobile: 'none',
        menu: undefined,
      },
    },
    title: 'APP_TITLE',
    routes: {
      login: '/auth/login',
      redirectTo: '/',
    },
    data: [],
    loading: { show: false, message: '' },
  } as SioCoreAppComponentStateModel,
  children: [SioCoreMenuState, SioCoreTabsState, SioCorePagesComponentState],
})
@Injectable()
export class SioCoreAppComponentState extends NgxsDataRepository<SioCoreAppComponentStateModel> {
  constructor(private translateService: TranslateService) {
    super();
  }
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
    this.ctx.setState((state) => {
      return { ...state, layout: { ...state.layout, split: value } };
    });
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
  get tabDesktopPosition(): unknown {
    return this.snapshot.layout?.tab?.desktop;
  }

  @Computed()
  get tabMobilePosition(): unknown {
    return this.snapshot.layout?.tab?.mobile;
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
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          left_panel: { ...state.layout?.left_panel, type: value },
        },
      };
    });
  }

  @DataAction()
  setRightPanelType(value: SioSideMenuType) {
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          right_panel: { ...state.layout?.right_panel, type: value },
        },
      };
    });
  }

  @DataAction()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTabDesktop(value: any) {
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          tab: { ...state.layout?.tab, desktop: value },
        },
      };
    });
  }

  @DataAction()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTabMobile(value: any) {
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          tab: { ...state.layout?.tab, mobile: value },
        },
      };
    });
  }

  @DataAction()
  setLeftMenuID(value: string) {
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          left_panel: { ...state.layout?.left_panel, menu: value },
        },
      };
    });
  }

  @DataAction()
  setRightMenuID(value: string) {
    console.log(value);
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          right_panel: { ...state.layout?.right_panel, menu: value },
        },
      };
    });
  }

  @DataAction()
  setTabMenuID(value: string) {
    console.log(value);
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          tab: { ...state.layout?.tab, menu: value },
        },
      };
    });
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
    console.log(value);
    this.ctx.setState((state: SioCoreAppComponentStateModel) => {
      return {
        ...state,
        layout: {
          ...state.layout,
          dark: value,
        },
      };
    });
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
    
    action: Function = (): null => {
      return null;
    },
  ): Promise<void> {
    this.patchState({
      errors: {
        name: this.translateService.instant(name),
        message: this.translateService.instant(message),
        action: action,
      },
    });
  }
}
