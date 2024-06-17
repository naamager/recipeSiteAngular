import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from '../../pages/home/home.component';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { StarComponent } from '../stars/stars.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, FormsModule, HomeComponent, StarComponent],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = []; // List to hold filtered recipes
  userEmail: string | null = null;
  categoryId: string | null = null;
  levels = [1, 2, 3, 4, 5]; // Levels for filtering
  selectedLevels: { [key: number]: boolean } = {}; // Selected levels for filtering
  showFilter = false; // Variable to toggle filter display
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.levels.forEach(level => {
      this.selectedLevels[level] = false; // Initialize all levels to false
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['userEmail'] || null;
      this.categoryId = params['categoryId'] || null;
      console.log(this.categoryId,"mmmmm");

      this.recipeService.getAll().subscribe((data: any) => {
        if (this.userEmail) {
          this.recipes = data.filter((recipe: any) =>
            recipe.userRecipe.some((user: any) => user.email === this.userEmail)
          );
        } else if (this.categoryId) {
          this.recipes = data.filter((recipe: any) =>
            recipe.categories[0]._id === this.categoryId
            // console.log(recipe.categories[0].categoryName,"ccccc");
          );
        } else {
          this.recipes = data;
        }
        console.log(this.recipes, "Filtered Recipes");
        this.applyFilters(); // Apply filters initially
      });
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toFullDetails(recipe: any) {
    this.router.navigate(['/fullRecipe'], { queryParams: { id: recipe._id } });
  }

  filterRecipes() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const level = recipe.level; // Assuming recipe.level holds the difficulty level
      return this.selectedLevels[level];
    });

    // If no levels are selected, show all recipes
    if (this.levels.every(level => !this.selectedLevels[level])) {
      this.filteredRecipes = this.recipes;
    }
  }
}
