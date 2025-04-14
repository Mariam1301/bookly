import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ui-dialog-actions',
  standalone: true,
  imports: [NgClass, TranslocoModule],
  templateUrl: './dialog-actions.component.html',
})
export class UiDialogActionsComponent {
  disabled = input(false);

  showCancel = input(false);

  saveClicked = output();

  private ref = inject(DynamicDialogRef);

  onCancelClick() {
    this.ref.close();
  }
}
