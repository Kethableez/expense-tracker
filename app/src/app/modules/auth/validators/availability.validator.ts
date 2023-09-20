import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export class AvailabilityValidator {
  static create(
    type: 'username' | 'email',
    authService: AuthService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService
        .checkAvailability(type, control.value)
        .pipe(
          map((response) =>
            response.exist ? { taken: { field: type } } : null
          )
        );
    };
  }
}
