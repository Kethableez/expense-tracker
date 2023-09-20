import { animate, style, transition, trigger } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(20px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(-20px)' })
    ),
  ]),
]);
