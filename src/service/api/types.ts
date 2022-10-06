export interface IDataModel<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface IPagination {
  count: number;
  pageNo: number;
  pageSize: number;
}

export interface ITableList {
  list: any[];
  page: IPagination;
}
