import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthStoreService } from 'src/app/core/services/store.service';

@Injectable()
export class CategoryService {
  constructor(
    private apiService: ApiService,
    private authStore: AuthStoreService
  ) {}

  getCommonCategories() {
    return from(
      this.apiService.pocketBase.collection('categories').getList(1, 500, {
        filter: `forAll=true || user.id="${this.authStore.currentUserId}"`,
      })
    ).pipe(map((collection) => collection.items));
  }

  addNewCategory(payload: { name: string; icon: string }) {
    return from(
      this.apiService.pocketBase.collection('categories').create({
        ...payload,
        user: this.authStore.currentUserId,
        forAll: false,
      })
    );
  }
}
