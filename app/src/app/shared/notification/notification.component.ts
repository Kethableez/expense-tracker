import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ktbz-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class NotificationComponent {
  @Input() header!: string;
  @Input() message!: string;
  @Input() type: string = 'info';
  @Input() closable = true;
  @Output() onClose = new EventEmitter<string>();

  statusIcons: Map<string, string> = new Map([
    ['info', 'bi-info-circle-fill'],
    ['success', 'bi-check-circle-fill'],
    ['warning', 'bi-exclamation-circle-fill'],
    ['error', 'bi-x-circle-fill'],
  ]);

  constructor() {}

  get statusIcon() {
    return this.statusIcons.get(this.type);
  }

  close() {
    this.onClose.emit(this.header);
  }
}
