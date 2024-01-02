import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  SioCoreFormComponentState,
  SioCoreFormComponentStateModel,
} from '@silicia/core';
import { sioStorageFileInterface } from '@silicia/storage';

@StateRepository()
@State<SioCoreFormComponentStateModel>({
  name: 'test',
  defaults: {
    layout: [
      {
        name: 'file',
        type: 'file',
        required: false,
      },
    ],
  },
})
@Injectable()
export class SiliciaInfoFormState extends SioCoreFormComponentState {
  constructor() {
    super();
  }

  @Computed()
  public get file(): sioStorageFileInterface[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = this.snapshot.data?.model;
    return data.file;
  }
}
