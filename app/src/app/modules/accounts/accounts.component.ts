import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlComponent } from 'src/app/shared/forms/control/control.component';

@Component({
  selector: 'ktbz-accounts',
  templateUrl: 'accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ControlComponent],
  providers: [AccountService],
})
export class AccountsComponent implements OnInit {
  accountForm!: FormGroup;
  accounts$ = this.accountService.getUserAccounts();

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  createAccount() {
    if (this.accountForm.invalid) return;
    const payload = this.accountForm.value;
    this.accountService
      .createNewAccount({
        ...payload,
        currency: 'PLN',
      })
      .subscribe({
        next: () => {
          this.notificationService.addNotification({
            header: 'Create success',
            message: 'New account was added',
            type: 'success',
            closable: true,
          });
          this.accounts$ = this.accountService.getUserAccounts();
        },
        error: ({ data }) => {
          this.notificationService.addNotification({
            header: 'Account error',
            message: data.message,
            type: 'error',
            closable: true,
          });
        },
        complete: () => this.cdr.markForCheck(),
      });
  }

  initForm() {
    this.accountForm = this.builder.group({
      name: new FormControl(null, Validators.required),
    });
  }
}
