import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategotyService } from '../../shared/services/categoty.service';// ודא ששם השירות תקין
import { Category } from '../../shared/models/category';
import { Recipe } from '../../shared/models/recipe';

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

  private categoryService = inject(CategotyService); // ודא ששם השירות תקין
  categories: Category[] = [];

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

  onSubmit() {
    const formValues = this.addRecipeForm.value;
    console.log(formValues);
    console.log('Form Category Value:', formValues.category);

    // מצא את הקטגוריה שנבחרה לפי ה-ID שלה
    const selectedCategory = this.categories.find(c => c.id === formValues.category);
    console.log('Selected Category:', selectedCategory); // הוסף הדפסה לבדיקת הערך שנמצא
     

     // this.recipeModel={
    //   "recipeName":this.addRecipeForm.controls['recipeName'].value,
    //   "descripition":this.addRecipeForm.controls['descripition'].value,
    //   "categories":this.addRecipeForm.controls['categories'].value,
    //   "time":this.addRecipeForm.controls['recipeName'].value,
    //   "level":this.addRecipeForm.controls['recipeName'].value,
    //   "layers":this.addRecipeForm.controls['recipeName'].value,
    //   "instructions":this.addRecipeForm.controls['recipeName'].value,
    //   "image":this.addRecipeForm.controls['recipeName'].value,
    //   "isPrivate":this.addRecipeForm.controls['recipeName'].value,
    //   "userRecipe":this.addRecipeForm.controls['recipeName'].value,
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
