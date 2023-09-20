import { Injectable } from '@angular/core';
import { catchError, from, map, of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  signIn(credentials: { username: string; password: string }) {
    return from(
      this.apiService.pocketBase
        .collection('users')
        .authWithPassword(credentials.username, credentials.password)
    );
  }

  signUp(payload: {
    username: string;
    email: string;
    emailVisibility: boolean;
    password: string;
    passwordConfirm: string;
    name: string;
  }) {
    return from(this.apiService.pocketBase.collection('users').create(payload));
  }

  signOut() {
    this.apiService.pocketBase.authStore.clear();
  }

  refresh() {
    return from(this.apiService.pocketBase.collection('users').authRefresh());
  }

  checkAvailability(property: string, value: string) {
    return from(
      this.apiService.pocketBase
        .collection('users')
        .getFirstListItem(`${property}="${value}"`, { fields: 'id' })
    ).pipe(
      map((v) => ({ exist: true })),
      catchError(() => of({ exist: false }))
    );
  }
}
