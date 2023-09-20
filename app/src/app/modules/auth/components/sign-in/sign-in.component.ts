import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ControlComponent } from 'src/app/shared/forms/control/control.component';
import { AuthService } from '../../services/auth.service';
import { AuthStoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'ktbz-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ControlComponent, ReactiveFormsModule, RouterModule],
  providers: [AuthService],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  signIn() {
    const credentials = this.signInForm.value;
    this.authService.signIn(credentials).subscribe({
      next: () => {
        this.authStoreService.onAuthCheck();
        this.router
          .navigate(['dashboard'])
          .then(() => this.notificationService.removeAllNotifications());
      },
      error: ({ data }) => {
        this.notificationService.addNotification({
          header: 'Authentication error',
          message: data.message,
          type: 'error',
          closable: true,
        });
      },
    });
  }

  private initForm() {
    this.signInForm = this.builder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}
