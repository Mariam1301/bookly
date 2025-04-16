import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [TranslocoDirective, UiDataElement, UiResponsiveDataViewComponent],
  templateUrl: './services-page.component.html',
})
export class ServicesPageComponent {
  data = signal<
    {
      id: number;
      name: string;
      description: string;
      images?: string[];
      duration: number;
      price: number;
    }[]
  >([]);

  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(ServiceDialogComponent, {
        header: this._translocoService.translate('service'),
        data: { data: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(ServiceDialogComponent, {
        header: this._translocoService.translate('service'),
        data: { data: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    // this._monthlyOvertimeService
    //   .delete( dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    this.data.set([
      {
        id: 1,
        name: 'თმის შეჭრა',
        description: 'ყველაზე მაგარი თმის შეჭრა',
        duration: 45,
        price: 15,
      },
    ]);
    // this._monthlyOvertimeService
    //   .getAll()
    //   .subscribe((monthlyOvertimes) => this.data.set(monthlyOvertimes));
  }
}
