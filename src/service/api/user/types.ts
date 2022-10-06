export interface ILoginResult {
  id: string | number;
  username: string;
  token: string;
}
export interface IAccount {
  username: string;
  password: string;
}

export interface IMenuData {
  path: string;
  id: number | string;
  [propName: string]: any;
}
