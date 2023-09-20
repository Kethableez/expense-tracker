import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({ providedIn: 'root' })
export class ApiService {
  pocketBase = new PocketBase('http://127.0.0.1:8090');
}
