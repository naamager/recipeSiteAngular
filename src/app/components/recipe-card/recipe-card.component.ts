import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../../pages/home/home.component';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, HomeComponent],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes: Recipe[] = [];
  userEmail: string | null = null;
  recipeId: string | null = null;
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['userEmail'] || null;
      
      this.recipeService.getAll().subscribe((data: any) => {
        if (this.userEmail) {
          this.recipes = data.filter((recipe: any) =>
            recipe.userRecipe.some((user: any) => user.email === this.userEmail)
          );
        } else {
          this.recipes = data;
        }
        console.log(this.recipes, "Filtered Recipes");
        if (this.recipes.length > 0) {
          const firstRecipe = this.recipes[0] as any;  // להק לאובייקט עם _id
          console.log(firstRecipe, "First Recipe");
          console.log(firstRecipe._id, "First Recipe ID");
        }
      });
    });
  }

  toFullDetails(recipe: any) {
    this.router.navigate(['/fullRecipe'], { queryParams: { id: recipe._id } });
  }
}
