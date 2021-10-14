export interface Pagination<T extends {}> {
  list: T[];
  pagination: {
    currentPage: number;
    limit: number;
    pages: number;
  };
}
