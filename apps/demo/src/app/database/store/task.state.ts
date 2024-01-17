import { createEntityCollections } from '@angular-ru/cdk/entity';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  SioDatabaseState,
} from '@silicia/database';
import { taskInterface } from './task.interface';

@StateRepository()
@State({
  name: 'tasks',
  defaults: createEntityCollections()
})
@Injectable()
export class TaskState extends SioDatabaseState<taskInterface> {
  
}