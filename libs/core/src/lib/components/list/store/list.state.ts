import { createEntityCollections } from '@angular-ru/cdk/entity';
import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { ActionType, State } from '@ngxs/store';
import { SioCoreListInterface } from './list.interface';

@StateRepository()
@State({
  name: 'list',
  defaults: createEntityCollections(),
})
@Injectable()
export class SioCoreListState extends NgxsDataEntityCollectionsRepository<SioCoreListInterface> {
  constructor() {
    super();
  }

  @DataAction()
  public go(url: string) {
    this.dispatch(new Navigate([url]) as unknown as ActionType);
  }
}
