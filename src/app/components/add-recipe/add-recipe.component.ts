import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategotyService } from '../../shared/services/categoty.service'; // ודא ששם השירות תקין
import { Category } from '../../shared/models/category';
import { Recipe } from '../../shared/models/recipe';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  private = ['yes', 'no'];
  addRecipeForm!: FormGroup;
  recipeModel?: Recipe;
  private recipeService = inject(RecipeService)
  private categoryService = inject(CategotyService); // ודא ששם השירות תקין
  categories: Category[] = [];
  showAddCategory = false;
  newCategory = '';

  ngOnInit() {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories, "Categories Loaded");
    });

    this.addRecipeForm = new FormGroup({
      'recipeName': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'time': new FormControl(null, [Validators.required]),
      'level': new FormControl(null),
      'instructions': new FormControl(null, Validators.required),
      'layers': new FormArray([]),
      'image': new FormControl(null, Validators.required),
      'isPrivate': new FormControl('yes', Validators.required),
    });
  }

  onCategoryChange(event: any) {
    if (event.target.value === 'add-category') {
      this.showAddCategory = true;
    } else {
      this.showAddCategory = false;
    }
  }

  addNewCategory() {
    const newCategory: Category = {
      id: this.categories.length + 1,
      description: this.newCategory,
    
    };
    this.categories.push(newCategory);
    this.addRecipeForm.patchValue({ category: newCategory.id });
    this.showAddCategory = false;
    this.newCategory = '';
  }

  onSubmit() {
    const formValues = this.addRecipeForm.value;
    console.log(formValues);
    console.log('Form Category Value:', formValues.category);

    const selectedCategory = this.categories.find(c => c.id === formValues.category);
    console.log('Selected Category:', selectedCategory);
    debugger

    this.recipeModel = {
      "recipeName": this.addRecipeForm.controls['recipeName'].value,
      "descripition": this.addRecipeForm.controls['description'].value,
      "categories": [selectedCategory ? { categoryName: selectedCategory.description } : { categoryName: "Unknown" }],
      "time": this.addRecipeForm.controls['time'].value,
      "level": this.addRecipeForm.controls['level'].value,
      "layers": this.addRecipeForm.controls['layers'].value,
      "instructions": this.addRecipeForm.controls['instructions'].value,
      "image": this.addRecipeForm.controls['image'].value,
      "isPrivate": this.addRecipeForm.controls['isPrivate'].value,
      "userRecipe": this.addRecipeForm.controls['userRecipe']?.value || '' // assuming 'userRecipe' is part of the form
    }
    debugger

    this.recipeService.addRecipe(this.recipeModel).subscribe((data) => {
      console.log(data);
      this.recipeService.token = data.token;

    }, (err) => {
      console.log(err);
    });
  }

  onAddLayer() {
    const layerGroup = new FormGroup({
      'layerTitle': new FormControl('Layer title:', Validators.required),
      'layerDescription': new FormControl('Ingredients:', Validators.required)
    });
    (<FormArray>this.addRecipeForm.get('layers')).push(layerGroup);
  }

  get layersControls() {
    return (<FormArray>this.addRecipeForm.get('layers')).controls;
  }
}
