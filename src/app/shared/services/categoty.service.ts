import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CategotyService {
  private http = inject(HttpClient);
  private categoryURL = `${environment.apiURL}/categories`;

  constructor() { }
  getAll() {
    return this.http.get(`${this.categoryURL}`);
  }
}
