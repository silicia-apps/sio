import { Injectable } from '@angular/core';
import { StateToken } from '@ngxs/store';
import { SioCorePageComponentInterface } from './page.model';

import { State } from '@ngxs/store';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';

const PAGE_STATE_TOKEN = new StateToken<SioCorePageComponentInterface>('page');

@StateRepository()
@State<SioCorePageComponentInterface>({
  name: PAGE_STATE_TOKEN,
  defaults: {
    'toolbar': true, 
    'title': 'T_PAGE',
    'menu': false,
    'back': false,
    'search': false,
  } as SioCorePageComponentInterface,
})
@Injectable()
export class SioCorePageComponentState extends NgxsDataRepository<SioCorePageComponentInterface> {

  @DataAction()
  public setTitle(value: string) {
    this.patchState({ 'title': value });
  }

  @Computed()
  public get title(): string | undefined {
    return this.snapshot.title;
  }

  @DataAction()
  public setMenu(value: boolean) {
    this.patchState({ 'menu': value });
  }

  @Computed()
  public get menu(): boolean | undefined {
    return this.snapshot.menu;
  }

  @DataAction()
  public setBack(value: boolean) {
    this.patchState({ 'back': value });
  }

  @Computed()
  public get back(): boolean | undefined {
    return this.snapshot.back;
  }

  @DataAction()
  public setSearch(value: boolean) {
    this.patchState({ 'search': value });
  }

  @Computed()
  public get search(): boolean | undefined {
    return this.snapshot.search;
  }

  @DataAction()
  public setToolbar(value: boolean | undefined) {
    this.patchState({ 'toolbar': value });
  }

  @Computed()
  public get toolbar(): boolean | undefined {
    return this.snapshot.toolbar;
  }

  

}
