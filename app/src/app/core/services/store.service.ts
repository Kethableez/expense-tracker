import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
  isAuthencticated$ = new BehaviorSubject<boolean>(false);

  private authStore = this.apiService.pocketBase.authStore;

  get currentUserId(): string | null {
    if (this.authStore.model) {
      return this.authStore.model['id'] as string;
    }
    return null;
  }

  constructor(private apiService: ApiService) {}

  onAuthCheck(): void {
    this.isAuthencticated$.next(this.authStore.isValid);
  }
}
