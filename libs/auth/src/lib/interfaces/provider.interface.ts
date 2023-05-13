export interface SioAuthProviderInterface {
  uid: string;
  provider: string;
  accessToken: string;
  accessTokenExpiry: string;
  refreshToken: string;
}
