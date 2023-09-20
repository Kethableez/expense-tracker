import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/shared/notification/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications: Notification[] = [];

  notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() {}

  addNotification(newNotification: Notification) {
    if (
      !this.notifications.filter(
        (notification) => notification.header === newNotification.header
      ).length
    ) {
      this.notifications.push(newNotification);
      this.next();
    }
  }

  removeAllNotifications() {
    this.notifications = [];
    this.next();
  }

  removeNotificationsByType(type: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.type !== type
    );
    this.next();
  }

  removeNotificationByKey(key: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.header !== key
    );
    this.next();
  }

  next() {
    this.notifications$.next(this.notifications);
  }
}
