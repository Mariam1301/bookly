import { Component, input } from '@angular/core';
import UiPaginationDataSource from '../../utils/data-source/pagination-data-source';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ButtonModule],
  selector: 'ui-load-more-button',
  templateUrl: './load-more-button.component.html',
})
export class UiLoadMoreButtonComponent {
  dataSource = input.required<UiPaginationDataSource>();

  onShowMoreClick() {
    this.dataSource().loadMoreData();
  }
}
