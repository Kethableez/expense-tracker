import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ktbz-navigation-item',
  templateUrl: 'navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('stretchInOut', [
      transition('void => *', [
        style({ opacity: 0, width: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1, width: '*' })),
      ]),
      transition('void => *', [
        animate('200ms ease-in-out', style({ opacity: 0, width: 0 })),
      ]),
    ]),
  ],
})
export class NavigationItemComponent implements OnInit {
  @Input() item!: {
    parent?: string;
    name: string;
    icon?: string;
    fragment: string;
  };
  @Input() isPrimary = true;
  constructor() {}

  ngOnInit() {}

  get routerLink() {
    if (this.item.parent) {
      return [this.item.parent, this.item.fragment];
    }
    return [this.item.fragment];
  }
}
