import { Injectable } from '@angular/core';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { createEntityCollections } from '@angular-ru/cdk/entity';
import { SioCorePageComponentInterface } from './page.model';

import { State } from '@ngxs/store';
import { StateRepository } from '@angular-ru/ngxs/decorators';

@StateRepository()
@State({
  name: 'pages',
  defaults: createEntityCollections(),
})
@Injectable()
export class SioCorePagesComponentState extends NgxsDataEntityCollectionsRepository<SioCorePageComponentInterface> {}
