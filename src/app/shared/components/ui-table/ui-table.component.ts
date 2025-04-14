import { CommonModule, NgClass } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { UiConfirmationDirective } from '../../directives/confirmation/confirmation.directive';
import { TableModule } from 'primeng/table';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    NgClass,
    UiConfirmationDirective,
    TableModule,
    TranslocoModule,
    CommonModule,
  ],
  templateUrl: './ui-table.component.html',
})
export class UiTableComponent {
  data = input.required<any[]>();
  columnList = input.required<
    { name?: string; templateRef?: TemplateRef<any>; valueField?: any }[] | null
  >();
  disabled = input(false);
  showDeleteButton = input(false);

  rowClicked = output<{ index: number; dataItem: any }>();

  deleteClicked = output<{ index: number; dataItem: any }>();
}
