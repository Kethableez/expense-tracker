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
import { InputErrorComponent } from 'src/app/shared/forms/input-error/input-error.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'ktbz-playground',
  templateUrl: 'playground.component.html',
  styleUrls: ['./playground.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ControlComponent,
    InputErrorComponent,
    NotificationComponent,
  ],
})
export class PlaygroundComponent implements OnInit {
  defaultForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initDefaultForm();
  }

  disable() {
    if (this.defaultForm.controls['prop2'].disabled) {
      this.defaultForm.controls['prop2'].enable();
    } else {
      this.defaultForm.controls['prop2'].disable();
    }
  }

  add(type: string) {
    switch (type) {
      case 'info':
        this.notificationService.addNotification({
          header: 'Sample info',
          message: 'Some info message',
          type: 'info',
          closable: true,
        });
        break;
      case 'error':
        this.notificationService.addNotification({
          header: 'Sample error',
          message: 'Some error message',
          type: 'error',
          closable: true,
        });
        break;
      case 'warning':
        this.notificationService.addNotification({
          header: 'Sample warning',
          message: 'Some warning message',
          type: 'warning',
          closable: true,
        });
        break;
      case 'success':
        this.notificationService.addNotification({
          header: 'Sample success',
          message: 'Some success message',
          type: 'success',
          closable: true,
        });
        break;
    }
  }

  initDefaultForm() {
    this.defaultForm = this.builder.group({
      prop1: new FormControl(null, Validators.required),
      prop2: new FormControl(null),
    });
  }

  get notifications() {
    return [
      {
        header: 'Info header',
        message:
          'Some info header that contains most accurate information about some actions that user did',
        type: 'info',
        closable: true,
      },
      {
        header: 'Success header',
        message:
          'Some success header that contains most accurate information about some actions that user did',
        type: 'success',
        closable: true,
      },
      {
        header: 'Warning header',
        message:
          'Some warning header that contains most accurate information about some actions that user did',
        type: 'warning',
        closable: false,
      },
      {
        header: 'Danger header',
        message:
          'Some danger header that contains most accurate information about some actions that user did',
        type: 'danger',
        closable: false,
      },
    ];
  }
}
