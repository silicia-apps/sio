import { SioAuthUserStatusType } from '../types';

export interface SioAuthUserInterface {
  uid: string;
  displayName: string;

  details: {
    firstname?: string;
    lastname?: string;
    language?: string;
    gender?: number;
    age?: number;
    country?: string;
    photoURL?: string;
  };

  status: SioAuthUserStatusType;

  phone?: {
    number?: string;
    verified?: boolean;
  };

  email?: {
    address?: string;
    verified?: boolean;
  };

  provider?: {
    password?: boolean;
    facebook?: boolean;
  };

  position?: { lat: number; lng: number };
  fcmTokens?: { [token: string]: true };

  other: unknown;

  createdAt?: string;
  updatedAt?: string;
}

export class SioAuthUser implements SioAuthUserInterface {
  uid = '';
  displayName = 'Guest';
  status = <SioAuthUserStatusType>'guest';
  details = {};
  other = {};
}
