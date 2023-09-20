import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import {
  query,
  transition,
  trigger,
  style,
  stagger,
  animate,
  state,
} from '@angular/animations';
import { slideInOut } from '../animations/slide-in-out.animation';

@Component({
  selector: 'ktbz-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NotificationComponent],
  animations: [slideInOut],
})
export class NotificationsComponent {
  notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {}

  removeNotification(key: string) {
    this.notificationService.removeNotificationByKey(key);
  }
}
