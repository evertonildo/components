
export interface Paginator {
  currentPageIndex: number;
  currentPage: number;
  pageSize: number;  //5 | 10 | 20 | 50 | 100;
  totalPages: number;
  pageButtonStyle: string;
  totalLines: number;
  firstPage: number;
  lastPage: number;
  firtsRecord: number;
  lastRecord: number;
  reload: boolean;
}
