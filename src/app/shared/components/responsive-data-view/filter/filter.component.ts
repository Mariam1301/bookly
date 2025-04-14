import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './filter.component.html',
  selector: 'data-view-filter',
})
export class FilterComponent {
  showButtons = input(false);

  clearClicked = output();
  filterClicked = output();

  isExpanded = signal(false);
}
