import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthStoreService } from 'src/app/core/services/store.service';

@Injectable()
export class AccountService {
  constructor(
    private apiService: ApiService,
    private authStore: AuthStoreService
  ) {}

  getUserAccounts() {
    return from(
      this.apiService.pocketBase.collection('accounts').getList(1, 500, {
        filters: `user.id="${this.authStore.currentUserId}"`,
      })
    ).pipe(map((accounts) => accounts.items));
  }

  createNewAccount(payload: { name: string; currency: 'PLN' | 'EUR' | 'USD' }) {
    return from(
      this.apiService.pocketBase.collection('accounts').create({
        ...payload,
        user: this.authStore.currentUserId,
      })
    );
  }
}
