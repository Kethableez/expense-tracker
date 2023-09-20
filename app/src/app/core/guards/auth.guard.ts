import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(): boolean {
    const isValid = this.apiService.pocketBase.authStore.isValid;
    if (!isValid) {
      this.router.navigateByUrl('/auth');
    }
    return isValid;
  }
}
