import { SioCoreAppCompomentInterface } from '../../../interfaces';

export interface SioCoreAppComponentStateModel
  extends SioCoreAppCompomentInterface {
  
  loading?:
    | {
        show: boolean;
        message?: string;
      }
    | undefined;
  errors?:
    | {
        // eslint-disable-next-line @typescript-eslint/ban-types
        action: Function;
        name: string;
        message: string;
      }
    | undefined;
}
