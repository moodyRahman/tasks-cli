type OauthResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type Config = {
  access_token: string;
  refresh_token: string;
  expire_stamp: number;
};

type RefreshResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export { OauthResponse, Config, RefreshResponse };
