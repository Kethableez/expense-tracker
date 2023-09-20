import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AvailabilityValidator } from '../validators/availability.validator';
import { MustMatchValidator } from '../validators/must-match.validator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthFormBuilder {
  constructor(private builder: FormBuilder, private authService: AuthService) {}

  buildForSignUp() {
    return this.builder.group(
      {
        username: new FormControl(null, {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ]),
          asyncValidators: AvailabilityValidator.create(
            'username',
            this.authService
          ),
          updateOn: 'blur',
        }),
        email: new FormControl(null, {
          validators: Validators.compose([
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ]),
          asyncValidators: AvailabilityValidator.create(
            'email',
            this.authService
          ),
          updateOn: 'blur',
        }),
        password: new FormControl(null, {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(72),
          ]),
          updateOn: 'blur',
        }),
        passwordConfirm: new FormControl(null, {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(72),
          ]),
          updateOn: 'blur',
        }),
        name: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25),
          ])
        ),
      },
      {
        validators: MustMatchValidator.create(
          'password',
          'passwordConfirm',
          'Passwords'
        ),
        updateOn: 'blur',
      }
    );
  }
}
