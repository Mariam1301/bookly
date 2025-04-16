import { Component, inject, signal } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';

@Component({
  selector: 'app-service-dialog',
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
  ],
  templateUrl: './service-dialog.component.html',
})
export class ServiceDialogComponent {
  data = signal<
    Partial<{
      id: number;
      name: string;
      description: string;
      images?: string[];
      duration: number;
      price: number;
    }>
  >({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);

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
