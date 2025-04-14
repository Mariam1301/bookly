import { Injectable } from '@angular/core';
import UiDataSource from './pagination-data-source';
import UiPaginationDataSource from './pagination-data-source';

@Injectable({ providedIn: 'root' })
export default class UiDatasourceCreator {
  constructor() {}

  createWithPagination(
    fetch: (pageNumber: number, pageSize: number, filter: any) => any
  ) {
    return new UiPaginationDataSource(fetch);
  }

  createGeneral(fetch: (filter?: any) => any) {
    return new UiDataSource(fetch);
  }
}
