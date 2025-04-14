import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { LoginData } from '../../../core/models/auth.model';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { TranslocoModule } from '@jsverse/transloco';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../../core/services/login/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    UiFormFieldComponent,
    TranslocoModule,
    FloatLabelModule,
    PasswordModule,
    RouterModule,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginData = signal<Partial<LoginData>>({});
  showInvalidCredentialsError = signal(false);

  private readonly _loginService = inject(LoginService);
  private readonly _router = inject(Router);

  onLogin() {
    this._loginService.login(this.loginData() as LoginData).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
      error: ({ status }) =>
        status === 401 && this.showInvalidCredentialsError.set(true),
    });
  }

  onFormChange() {
    this.showInvalidCredentialsError.set(false);
  }
}
