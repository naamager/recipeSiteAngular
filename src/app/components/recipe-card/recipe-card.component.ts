import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from '../../pages/home/home.component';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,HomeComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnInit {

  private recipeServise = inject(RecipeService)
  recipes: Recipe[] = [];




  ngOnInit() {
    this.recipeServise.getAll().subscribe((data: any) => {
      this.recipes = data.map((recipe: any) => recipe);
      console.log(this.recipes, "recipessss");
      console.log(this.recipes[10].userRecipe[0].UserName, "recipessss");
    });
  }

}
