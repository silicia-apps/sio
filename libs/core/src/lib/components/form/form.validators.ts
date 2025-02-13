import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive } from '@angular/core';

export function sioEmailValidator(): ValidatorFn {
  const regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null =>
    regexp.test(control.value) ? null : { error: 'NOT_IS_EMAIL' };
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[sioEmailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: unknown } | null {
    return sioEmailValidator()(control);
  }
}
