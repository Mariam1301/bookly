import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { UiConfirmPassword } from '../../../shared/directives/confirm-password/confirm-password.directive';
import { RegistrationService } from '../../../core/services/registration/registration.service';
import { Router, RouterModule } from '@angular/router';
import { RegistrationData } from '../../../core/models/auth.model';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    UiFormFieldComponent,
    TranslocoModule,
    FloatLabelModule,
    PasswordModule,
    UiConfirmPassword,
    RouterModule,
  ],
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent {
  registrationData = signal<Partial<RegistrationData>>({});
  showEmailError = signal(false);

  private readonly _registrationService = inject(RegistrationService);
  private readonly _router = inject(Router);

  onRegistrationClick() {
    this._registrationService
      .register(this.registrationData() as RegistrationData)
      .subscribe({
        next: () => this._router.navigate(['/']),
        error: ({ error }) => this.showEmailError.set(!!error?.email),
      });
  }
}
