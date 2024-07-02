import{CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { HomeComponent } from '../../pages/home/home.component'; // Assuming this is a standalone component
import { StarComponent } from '../stars/stars.component'; // Assuming this is a standalone component

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    HomeComponent, // Assuming this is a standalone component
    StarComponent // Assuming this is a standalone component
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  userEmail: string | null = null;
  categoryId: string | null = null;
  levels = [1, 2, 3, 4, 5];
  selectedLevels: { [key: number]: boolean } = {};
  showFilter = false;
  showTimeFilter = false;
  selectedTime: number | null = null;
  private router = inject(Router);
  isUserRecipes = false;
  search: string = '';
  page: number = 1;
  limit: number = 6;
  totalPages: number = 0;


  constructor(private route: ActivatedRoute) {
    this.levels.forEach(level => {
      this.selectedLevels[level] = false;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.userEmail = params['userEmail'] || null;
        this.categoryId = params['categoryId'] || null;
        this.isUserRecipes = this.userEmail !== null;
        this.search = params['search'] || '';
        this.page = +params['page'] || 1;
        this.limit = +params['limit'] || 6;

        this.recipeService.getAll(this.search, this.page, this.limit).subscribe((data: any) => {
            if (this.userEmail) {
                this.recipes = data.recipes.filter((recipe: any) =>
                    recipe.userRecipe.some((user: any) => user.email === this.userEmail)
                );
            } else if (this.categoryId) {
                this.recipes = data.recipes.filter((recipe: any) =>
                    recipe.categories[0]._id === this.categoryId
                );
            } else {
                this.recipes = data.recipes;
            }
            this.totalPages = data.totalPages;
            this.applyFilters();
        });
    });
}
  fetchRecipes() {
    this.recipeService.getAll(this.search, this.page, this.limit).subscribe(
      data => {
        this.recipes = data.recipes;
        this.totalPages = data.totalPages;
        this.filteredRecipes = this.recipes;
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updateQueryParams();
      this.fetchRecipes();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.updateQueryParams();
      this.fetchRecipes();
    }
  }
  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleTimeFilter() {
    this.showTimeFilter = !this.showTimeFilter;
  }

  toFullDetails(recipe: any) {
    this.router.navigate(['/fullRecipe'], { queryParams: { id: recipe._id } });
  }

  filterRecipes() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const level = recipe.level;
      const time = recipe.time;

      const levelFilter = this.levels.every(level => !this.selectedLevels[level]) || this.selectedLevels[level];
      const timeFilter = this.selectedTime === null || time <= this.selectedTime;

      return levelFilter && timeFilter;
    });

    if (this.levels.every(level => !this.selectedLevels[level]) && this.selectedTime === null) {
      this.filteredRecipes = this.recipes;
    }
  }

  createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

  confirmDelete(recipe: Recipe) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.deleteRecipe(recipe);
    }
  }

 
  deleteRecipe(recipe: Recipe) {
    this.recipeService.delete(recipe._id!).subscribe(() => {
      this.recipes = this.recipes.filter(r => r._id !== recipe._id);
      this.applyFilters();
      window.location.reload(); // Refresh the page after deletion
    });
    console.log(recipe._id, "delete");
    console.log(recipe, "delete");
  }
}