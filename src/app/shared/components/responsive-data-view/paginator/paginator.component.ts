import { Component, input, signal } from '@angular/core';
import UiPaginationDataSource from '../../../utils/data-source/pagination-data-source';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  selector: 'ui-paginator',
})
export class UiPaginatorComponent {
  dataSource = input.required<UiPaginationDataSource>();

  first = signal(0);

  onPageChange({ first, rows, page, pageCount }: Partial<PageEvent>) {
    this.first.set(first || 0);
    this.dataSource().fetchSpecificPage((page || 0) + 1, rows);
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
