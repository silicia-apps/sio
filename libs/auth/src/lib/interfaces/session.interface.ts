import {
  SioAuthClientInterface,
  SioAuthDeviceInterface,
  SioAuthOsInterface,
  SioAuthProviderInterface,
} from '.';

export interface SioAuthSessionInterface {
  createdAt: string;
  id: string;
  userId: string;
  current: boolean;
  expire: string;
  ip: string;
  client: SioAuthClientInterface;
  country: {
    code: string;
    name: string;
  };
  device: SioAuthDeviceInterface;
  os: SioAuthOsInterface;
  provider: SioAuthProviderInterface;
}
