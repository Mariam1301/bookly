import { Directive, forwardRef, input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[uiConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UiConfirmPassword),
      multi: true,
    },
  ],
  standalone: true,
})
export class UiConfirmPassword implements Validator {
  confirmPasswordControl = input<string>('', { alias: 'uiConfirmPassword' });

  validate(control: AbstractControl): ValidationErrors | null {
    const confirmInput = control?.value;
    const inputControl = control?.root?.get(this.confirmPasswordControl());

    if (inputControl && confirmInput !== inputControl.value) {
      return { PasswordNoMatch: true };
    }

    return null;
  }
}
