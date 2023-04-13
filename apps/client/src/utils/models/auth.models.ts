export interface AuthModel {
  email: string;
  password: string;
}

export interface TokenModel {
  access_token: string;
  refresh_token: string;
}
