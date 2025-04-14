import { inject, Inject, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Inject({ providedIn: 'root' })
export class UiDialogService {
  private readonly _dialogService = inject(DialogService);

  open(component: Type<unknown>, config?: DynamicDialogConfig) {
    return this._dialogService.open(component, {
      header: '',
      width: '60vw',
      modal: false,
      closable: true,
      breakpoints: { '800px': '100vw' },
      maskStyleClass: 'bg-black bg-opacity-50',
      ...config,
    });
  }
}
