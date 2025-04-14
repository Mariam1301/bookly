import { Observable } from 'rxjs';

export default class UiPaginationDataSource {
  data: any = [];
  filter: any = {};
  pageSize = 10;
  pageNumber = 1;
  totalCount = 0;
  totalPages = 0;
  filterCount = 0;

  response: any;

  loadMore = window.innerWidth < 640;

  constructor(
    private fetch: (
      pageNumber: number,
      pageSize: number,
      filter?: any
    ) => Observable<any>,
    private config?: any
  ) {}

  countFilter() {
    this.filterCount = Object.values(this.filter).filter(Boolean).length;
  }

  fetchData() {
    this.fetch(this.pageNumber, this.pageSize, this.filter).subscribe(
      (response) => {
        this.response = response;
        this.data = response?.data;
        this.totalCount = response?.total;
      }
    );
  }

  refresh() {
    this.loadMore ? this.refreshOnLoadMore() : this.fetchData();
  }

  fetchSpecificPage(pageNumber?: number, pageSize?: number) {
    pageNumber && (this.pageNumber = pageNumber);
    pageSize && (this.pageSize = pageSize);

    this.fetch(this.pageNumber, this.pageSize, this.filter).subscribe(
      (response) => {
        this.data = response.data;
      }
    );
  }

  loadMoreData() {
    this.pageNumber++;
    this.fetch(this.pageNumber, this.pageSize, this.filter).subscribe(
      (response) => {
        this.data = [...this.data, ...response.data];
      }
    );
  }

  refreshOnLoadMore() {
    const totalPageSize = this.pageNumber * this.pageSize;
    this.fetch(0, totalPageSize, this.filter).subscribe((response) => {
      this.data = response.data;
    });
  }

  clearFilter() {
    this.filter = {};
    this.fetchData();
  }
}
