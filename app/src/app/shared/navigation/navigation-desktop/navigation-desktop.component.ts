import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthStoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'ktbz-navigation-desktop',
  templateUrl: 'navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, NavigationItemComponent],
  animations: [expandCollapse],
})
export class NavigationDesktopComponent implements OnInit {
  mode: 'dark' | 'light' = 'dark';
  toggleMode() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.mode);
  }

  isAuthenticated$ = this.authStore.isAuthencticated$.pipe(
    filter((isValid) => isValid)
  );

  constructor(private router: Router, private authStore: AuthStoreService) {}

  get modeIcon() {
    return this.mode === 'dark' ? 'bi-moon-stars' : 'bi-sun';
  }

  secondLevel$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event as NavigationEnd),
    map(({ urlAfterRedirects }) => {
      console.log(urlAfterRedirects);
      const [_, currentFragment] = urlAfterRedirects.split('/');
      const children = this.navigationItems.find(
        (item) => item.fragment === currentFragment
      )?.children;
      if (children) {
        return children.map((child) => ({ ...child, parent: currentFragment }));
      }
      return null;
    })
  );

  ngOnInit() {
    document.documentElement.setAttribute('data-theme', this.mode);
  }

  navigationItems = [
    {
      name: 'Dashboard',
      icon: 'bi-house',
      fragment: 'dashboard',
    },
    {
      name: 'Expenses',
      icon: 'bi-cash',
      fragment: 'expenses',
      children: [
        {
          name: 'List',
          fragment: 'list',
        },
        {
          name: 'Add expense',
          fragment: 'create',
        },
        {
          name: 'Categories',
          fragment: 'categories',
        },
      ],
    },
    {
      name: 'Analytics',
      icon: 'bi-pie-chart',
      fragment: 'analytics',
      children: [
        {
          name: 'Income',
          fragment: 'income',
        },
        {
          name: 'Outcome',
          fragment: 'outcome',
        },
        {
          name: 'Loafey',
          fragment: 'loafey',
        },
      ],
    },
    {
      name: 'Accounts',
      icon: 'bi-bank',
      fragment: 'accounts',
    },
    {
      name: 'Settings',
      icon: 'bi-gear',
      fragment: 'settings',
      children: [
        {
          name: 'Profile',
          fragment: 'profile',
        },
        {
          name: 'App',
          fragment: 'app',
        },
      ],
    },
  ];
}
