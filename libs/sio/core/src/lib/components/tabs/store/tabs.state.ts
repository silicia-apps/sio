import { createEntityCollections } from '@angular-ru/cdk/entity';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SioCoreTabsStateModel } from './tabs.model';

@StateRepository()
@State({
  name: 'tabs',
  defaults: createEntityCollections(),
})
@Injectable()
export class SioCoreTabsState extends NgxsDataEntityCollectionsRepository<SioCoreTabsStateModel> {
  constructor() {
    super();
  }
}
