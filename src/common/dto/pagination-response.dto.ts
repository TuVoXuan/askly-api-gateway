export class PaginationResponseDto<T> {
  data: T[];
  page: number;
  limit: number;
  totalRecords: number;

  constructor(data: T[], page: number, limit: number, totalRecords: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.totalRecords = totalRecords;
  }
}
