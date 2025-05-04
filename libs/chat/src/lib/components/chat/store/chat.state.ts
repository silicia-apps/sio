import { createEntityCollections } from '@angular-ru/cdk/entity';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  SioDatabaseState,
} from '@silicia/database';
import { SioChatComponentStateModel } from './chat.model';

@StateRepository()
@State({
  name: 'chat',
  defaults: createEntityCollections()
})
@Injectable()
export class TaskState extends SioDatabaseState<SioChatComponentStateModel> {
  
}