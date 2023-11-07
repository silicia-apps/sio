import { SioCoreItemInterface } from '../../../interfaces';

export interface SioCoreListInterface {
  id: string;
  items: { [id: number]: SioCoreItemInterface };
}
