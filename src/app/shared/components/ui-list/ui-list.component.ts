import { CommonModule } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { UiConfirmationDirective } from '../../directives/confirmation/confirmation.directive';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ui-list',
  standalone: true,
  imports: [UiConfirmationDirective, TranslocoDirective, CommonModule],
  templateUrl: './ui-list.component.html',
})
export class UiListComponent {
  data = input.required<any[]>();
  columnList = input.required<
    { name?: string; templateRef?: TemplateRef<any>; valueField?: any }[] | null
  >();
  disabled = input(false);
  showDeleteButton = input(false);

  rowClicked = output<{ index: number; dataItem: any }>();

  deleteClicked = output<{ index: number; dataItem: any }>();
}
