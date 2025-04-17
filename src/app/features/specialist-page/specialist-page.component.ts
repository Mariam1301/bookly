import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { SpecialistDialogComponent } from './service-dialog/specialist-dialog.component';

@Component({
  selector: 'app-specialist-page',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './specialist-page.component.html',
})
export class SpecialistPageComponent {
  data = signal<
    {
      id: number;
      name: string;
      surname: string;
      image?: string;
      experience: number;
      services: { id: number; name: string }[];
    }[]
  >([]);

  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(SpecialistDialogComponent, {
        header: this._translocoService.translate('specialist'),
        data: { data: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(SpecialistDialogComponent, {
        header: this._translocoService.translate('specialist'),
        data: {
          data: {
            ...dataItem,
            services: dataItem?.services?.map(({ id }: { id: number }) => id),
          },
        },
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
        name: 'ლამარა',
        surname: 'ლამზირა',
        experience: 4,
        services: [
          { name: 'თმის შეჭრა', id: 1 },
          { name: 'თმის დაბარცხნა', id: 2 },
        ],
      },
    ]);
    // this._monthlyOvertimeService
    //   .getAll()
    //   .subscribe((monthlyOvertimes) => this.data.set(monthlyOvertimes));
  }
}
