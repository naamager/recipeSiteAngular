import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private recipeURL = `${environment.apiURL}/recipes`;
 
  constructor() {

   }

   public set token(token: string | null) {
    if (token) {
      localStorage.setItem('mytoken', token);
    }
  }

   getAll (search: string, page: number, limit: number): Observable<any> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(this.recipeURL, { params });
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeURL}/${id}`);
  }
  delete(id: string): Observable<Recipe> {
    console.log("in delete service");
    return this.http.delete<Recipe>(`${this.recipeURL}/deleteRecipe/${id}`);
  }
  addRecipe(recipe:Recipe){
    return this.http.post <{ token: string }> ( 
      `${this.recipeURL}/addRecipe`,  recipe);
   }
    

  

  /*   signup(addUser: User) {
    return this.http.post<{ user: User; token: string }>(
      `${this.usersURL}/signUp`,
      addUser
    
  } */
}
