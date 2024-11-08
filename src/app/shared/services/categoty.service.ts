import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategotyService {
  private apiUrl =`${environment.apiURL}/categories`; // שנה לכתובת ה-API שלך

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
