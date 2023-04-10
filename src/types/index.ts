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
  boards?: {
    title: string;
    id: string;
  }[];
};

type RefreshResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

type TasksLists = {
  kind: string;
  etag: string;
  items: TaskList[];
};

type TaskList = {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
};

type Task = {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  position: string;
  status: string;
  links: [];
};

export { OauthResponse, Config, RefreshResponse, TaskList, TasksLists, Task };
