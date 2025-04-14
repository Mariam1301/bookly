import { Component, input } from '@angular/core';
import UiPaginationDataSource from '../../utils/data-source/pagination-data-source';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ButtonModule, NgIf],
  selector: 'ui-load-more-button',
  templateUrl: './load-more-button.component.html',
})
export class UiLoadMoreButtonComponent {
  dataSource = input.required<UiPaginationDataSource>();

  onShowMoreClick() {
    this.dataSource().loadMoreData();
  }
}
