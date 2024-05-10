import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SioCoreFormComponentState, SioCoreFormComponentStateModel } from '@silicia/core';

@StateRepository()
@State<SioCoreFormComponentStateModel>({
  name: 'login',
  defaults: {
    layout: [
      {
        name: 'username',
        type: 'email',
        required: true,
      },
      { name: 'password', type: 'password-withtoogle', required: true },
    ],
  },
})
@Injectable()
export class SioAuthLoginComponentState extends SioCoreFormComponentState {
  constructor() {
    super();
  }

  @Computed()
  public get username(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = this.snapshot.data?.model;
    return data.username;
  }

  @Computed()
  public get password(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = this.snapshot.data?.model;
    return data.password;
  }
}
