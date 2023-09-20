import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ControlComponent } from 'src/app/shared/forms/control/control.component';
import { AuthService } from '../../services/auth.service';
import { AvailabilityValidator } from '../../validators/availability.validator';
import { MustMatchValidator } from '../../validators/must-match.validator';
import { AuthFormBuilder } from '../../services/auth-form.builder';

@Component({
  selector: 'ktbz-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ControlComponent, RouterModule],
  providers: [AuthService, AuthFormBuilder],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private builder: AuthFormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  signUp() {
    const payload = this.signUpForm.value;
    this.authService.signUp({ ...payload, emailVisibility: true }).subscribe({
      next: (response) => {
        console.log(response);
        this.notificationService.addNotification({
          header: 'Register success',
          message: 'Account was created',
          type: 'success',
          closable: true,
        });
      },
      error: ({ data }) => {
        this.notificationService.addNotification({
          header: 'Register error',
          message: data.message,
          type: 'error',
          closable: true,
        });
      },
    });
  }

  private initForm() {
    this.signUpForm = this.builder.buildForSignUp();
  }
}
