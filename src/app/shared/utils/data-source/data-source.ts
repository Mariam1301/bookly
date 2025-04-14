import { Observable } from 'rxjs';

export default class UiDataSource {
  data: any = [];
  filter: any = {};
  filterCount = 0;

  constructor(
    private fetch: (filter?: any) => Observable<any>,
    private config?: any
  ) {}

  fetchData() {
    this.fetch(this.filter);
  }

  countFilter() {
    this.filterCount = Object.values(this.filter).filter(Boolean).length;
  }
}
