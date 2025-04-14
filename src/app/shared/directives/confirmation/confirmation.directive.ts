import { Directive, HostListener, inject, input, output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ConfirmationService } from 'primeng/api';

@Directive({
  selector: '[uiConfirm]',
  standalone: true,
})
export class UiConfirmationDirective {
  type = input<'delete' | 'save'>('delete');

  confirm = output();
  reject = output();

  private readonly _translocoService = inject(TranslocoService);

  constructor(private confirmationService: ConfirmationService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopImmediatePropagation();
    const basicConfig =
      this.type() === 'delete'
        ? {
            target: event.target as EventTarget,
            message: this._translocoService.translate(
              'areYouSureYouWantToDelete'
            ),
            header: this._translocoService.translate('delete'),
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            acceptLabel: this._translocoService.translate('delete'),
            rejectLabel: this._translocoService.translate('cancel'),
          }
        : {
            target: event.target as EventTarget,
            message: this._translocoService.translate(
              'areYouSureYouWantToContinue'
            ),
            header: this._translocoService.translate('confirm'),
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
          };

    this.confirmationService.confirm({
      ...basicConfig,
      accept: () => this.confirm.emit(),
      reject: () => this.reject.emit(),
    });

    event.preventDefault();
  }
}
