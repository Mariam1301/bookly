import { Component, inject, signal } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TIME, WEEKDAYS } from '../../../core/constants/general.constant';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-specialis-dialog',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
    TextareaModule,
    ImageUploadComponent,
    MultiSelectModule,
    SelectModule,
  ],
  templateUrl: './specialist-dialog.component.html',
})
export class SpecialistDialogComponent {
  data = signal<
    Partial<{
      id: number;
      name: string;
      surname: string;
      image?: string;
      experience: number;
      services: number[];
      days: number[];
      start_time: number;
      finish_time: number;
      break_time: number;
      break_duration: number;
    }>
  >({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _translocoService = inject(TranslocoService);

  services = [
    { id: 1, label: 'თმის შეჭრა' },
    { id: 2, label: 'თმის დაბარცხნა' },
  ];

  weekdays = WEEKDAYS.map((day) => ({
    ...day,
    label: this._translocoService.translate(day.name),
  }));

  time = TIME;

  ngOnInit(): void {
    const data = { ...this._dialogConfig.data?.data };
    data && this.data.set(data);
  }

  onSaveClick() {
    console.log(this.data());
    // const stream$ = data?.id
    //   ? this._monthlyOvertimeService.update(data)
    //   : this._employeeService.add(data);

    // stream$.subscribe(() => this._ref.close(true));
  }
}
