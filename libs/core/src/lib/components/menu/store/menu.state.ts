import { createEntityCollections } from '@angular-ru/cdk/entity';
import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { ActionType, State } from '@ngxs/store';
import { SioCoreMenuInterface } from '../../../interfaces';

@StateRepository()
@State({
  name: 'menu',
  defaults: createEntityCollections(),
})
@Injectable()
export class SioCoreMenuState extends NgxsDataEntityCollectionsRepository<SioCoreMenuInterface> {
  
  @DataAction()
  public go(url: string) {
    this.dispatch(new Navigate([url]) as unknown as ActionType);
  }
}
