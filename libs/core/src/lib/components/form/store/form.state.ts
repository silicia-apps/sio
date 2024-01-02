import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';
import type {
  SioCoreFormInterface,
  SioCoreFormComponentStateModel,
} from '..';
import { Selector, State, Store } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { SioCoreFormComponentInputInterface } from '../../input/input.interface';
import { Injectable, inject } from '@angular/core';
import { ResetForm } from '@ngxs/form-plugin';

@StateRepository()
@State({
  name: 'form',
})
@Injectable()
export class SioCoreFormComponentState
  extends NgxsDataRepository<SioCoreFormComponentStateModel>
  implements SioCoreFormInterface
{
  private store = inject(Store);
  @Selector([SioCoreFormComponentState])
  static getData(state: SioCoreFormComponentStateModel) {
    return state.data?.model;
  }

  @Selector([SioCoreFormComponentState])
  static OnSubmit(state: SioCoreFormComponentStateModel) {
    return state.submitted;
  }

  @DataAction()
  public form_name(data: string): void {
    this.patchState({
      data: {
        name: data,
      },
    });
  }

  @DataAction()
  public resetForm(): void {
    this.store.dispatch(new ResetForm({ path: `${this.name}.data` }));
  }

  @DataAction()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async submit(): Promise<void> {}

  @Computed()
  public get layout(): SioCoreFormComponentInputInterface[] | undefined {
    return this.snapshot.layout;
  }

  @Computed()
  public get valid(): boolean {
    return this.snapshot.data?.status == 'VALID';
  }

  @Computed()
  public get isDirty(): boolean {
    return this.snapshot.data?.dirty || false;
  }
}
