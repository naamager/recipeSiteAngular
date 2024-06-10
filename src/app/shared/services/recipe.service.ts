import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private recipeURL = `${environment.apiURL}/recipes`;
 
  constructor() {

   }
   getAll() {
    return this.http.get(`${this.recipeURL}`);
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeURL}/${id}`);
  }
}
