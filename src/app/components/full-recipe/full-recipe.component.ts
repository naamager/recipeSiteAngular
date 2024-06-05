import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-recipe',
  standalone: true,
  imports: [],
  templateUrl: './full-recipe.component.html',
  styleUrl: './full-recipe.component.scss'
})
export class FullRecipeComponent implements OnInit{
  recipeId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id'); // Access the ID from URL
  }
}