import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[uiIbanValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IbanValidatorDirective,
      multi: true,
    },
  ],
})
export class IbanValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const iban = control.value;

    if (!iban) {
      return null;
    }

    if (!this.isValidIban(iban)) {
      return { invalidIban: true };
    }

    return null;
  }

  private isValidIban(iban: string): boolean {
    iban = iban.replace(/[\s]+/g, '').toUpperCase();

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)) {
      return false;
    }

    const rearranged = iban.slice(4) + iban.slice(0, 4);

    const numericIban = rearranged
      .split('')
      .map((char) => (isNaN(Number(char)) ? char.charCodeAt(0) - 55 : char))
      .join('');

    const mod97 = BigInt(numericIban) % 97n;

    return mod97 === 1n;
  }
}
