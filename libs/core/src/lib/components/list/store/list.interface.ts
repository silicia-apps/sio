import { SioCoreItemInterface } from '../../item';

export interface SioCoreListInterface {
  id: string;
  items: { [id: number]: SioCoreItemInterface };
}
