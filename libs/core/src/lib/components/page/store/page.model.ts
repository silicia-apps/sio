import { InputBoolean } from '@angular-ru/cdk/typings';
import { SioColorType } from '../../../types';

export interface SioCorePageComponentInterface {
  id: string;
  toolbar?: InputBoolean;
  title?: string;
  color?: SioColorType;
  back?: InputBoolean;
  menu?: InputBoolean;
  search?: InputBoolean;
}
