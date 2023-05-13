import { SioCoreFormComponentInputInterface } from '../../input/input.interface';

export interface SioCoreFormComponentStateModel {
  data?: {
    model?: [];
    name: string;
    dirty?: boolean;
    status?: string;
    errors?: object;
  };
  layout?: SioCoreFormComponentInputInterface[];
  submitted?: boolean;
}

export interface SioCoreFormInterface {
  submit(): void;
}
