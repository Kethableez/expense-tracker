import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { isObjectEmpty } from 'src/app/core/functions/is-object-empty.fn';

export class MustMatchValidator {
  static create(field1: string, field2: string, label: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const parent = formGroup as FormGroup;
      if (!parent) {
        return null;
      }
      const control1 = parent.controls[field1];
      const control2 = parent.controls[field2];

      if (!control1 && !control2) {
        return null;
      } else {
        const control1Value = control1.value;
        const control2Value = control2.value;

        const control1Errors = control1.errors;
        const control2Errors = control2.errors;

        if (
          !control1.pristine &&
          !control2.pristine &&
          control1Value !== control2Value
        ) {
          control1.setErrors({ ...control1Errors, mustMatch: { label } });
          control2.setErrors({ ...control2Errors, mustMatch: { label } });
          return { mustMatch: { label } };
        }

        if (control1Errors) {
          delete control1Errors['mustMatch'];
        }

        if (control2Errors) {
          delete control2Errors['mustMatch'];
        }

        control1.setErrors(
          isObjectEmpty(control1Errors) ? null : control1Errors
        );
        control2.setErrors(
          isObjectEmpty(control2Errors) ? null : control2Errors
        );

        return null;
      }
    };
  }
}
