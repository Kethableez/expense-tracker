import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { AuthStoreService } from './core/services/store.service';

@Component({
  selector: 'ktbz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'expense-tracker-app';

  constructor(private authStore: AuthStoreService) {}

  ngOnInit(): void {
    this.authStore.onAuthCheck();
  }
}
