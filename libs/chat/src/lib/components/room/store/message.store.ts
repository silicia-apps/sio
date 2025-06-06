import { createEntityCollections } from '@angular-ru/cdk/entity';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SioDatabaseState } from '@silicia/database';
import { SioChatMessageStateModel } from './message.model';

@StateRepository()
@State({
  name: 'messages',
  defaults: createEntityCollections(),
})
@Injectable()
export class SioChatMessageState extends SioDatabaseState<SioChatMessageStateModel> {}
