import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes:Recipe[];
  constructor() {
    this.recipes=[];

   }
}
