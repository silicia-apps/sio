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
  name: 'file1',
  defaults: {
    layout: [
      {
        name: 'file',
        type: 'file',
        label: 'LABEL_FILE_1',
        required: true,
      },
    ],
  },
})
@Injectable()
export class SiliciaInfoFormState1 extends SioCoreFormComponentState {
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

@StateRepository()
@State<SioCoreFormComponentStateModel>({
  name: 'file2',
  defaults: {
    layout: [
      {
        name: 'file',
        type: 'file',
        label: 'LABEL_FILE_2',
        required: true,
      },
    ],
  },
})
@Injectable()
export class SiliciaInfoFormState2 extends SioCoreFormComponentState {
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

@StateRepository()
@State<SioCoreFormComponentStateModel>({
  name: 'file3',
  defaults: {
    layout: [
      {
        name: 'file',
        type: 'file',
        label: 'LABEL_FILE_3',
        required: true,
      },
    ],
  },
})
@Injectable()
export class SiliciaInfoFormState3 extends SioCoreFormComponentState {
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
