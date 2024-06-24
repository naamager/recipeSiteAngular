import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service'; // עדכן את הנתיב לפי הצורך
import { Recipe } from '../../shared/models/recipe'; // עדכן את הנתיב לפי הצורך
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NewlinePipe } from '../../pipes/newline.pipe';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { RepeatDirective } from '../../directives/repeat.directive';
import { StarComponent } from '../stars/stars.component';

@Component({
  selector: 'app-full-recipe',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NewlinePipe, TimeFormatPipe, RepeatDirective, StarComponent],
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss']
})
export class FullRecipeComponent implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe | null = null;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recipeId = params['id'] || null;
      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).subscribe(
          (data: Recipe) => {
            this.recipe = data;
        
          },
          error => {
            console.error('Error fetching recipe:', error);
          }
        );
      }
    });
  }
}
