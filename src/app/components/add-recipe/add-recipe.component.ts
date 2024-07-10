import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategotyService } from '../../shared/services/categoty.service';
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
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategotyService);
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
      'level': new FormControl(null, Validators.required),
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

    const selectedCategory = this.categories.find(c => c.id === formValues.category);

    // Convert time to minutes as number
    const [hours, minutes] = formValues.time.split(':').map((val: string) => parseInt(val, 10));
    const timeInMinutes = hours * 60 + minutes;

    const recipeModel: Recipe = {
      recipeName: formValues.recipeName,
      descripition: formValues.description,
      categories: selectedCategory ? [{ categoryName: selectedCategory.description }] : [],
      time: timeInMinutes,
      level: formValues.level,
      layers: formValues.layers.map((layer: any) => ({
        descripitionOfLayer: layer.layerTitle,
        ingredients: layer.layerDescription.split('\n')
      })),
      instructions: formValues.instructions,
      image: formValues.image,
      isPrivate: formValues.isPrivate === 'yes',
      userRecipe: [
        {
          _id: '665854d6905b84814c711f70', // the user's ID as a string
          UserName: 'judi', // replace with the actual username
          email: 'neg3416@gmail.com' // replace with the actual email
        }
      ]
    };

    this.recipeService.addRecipe(recipeModel).subscribe(
      (data) => {
        console.log('Recipe added successfully:', data);
        this.recipeService.token = data.token;
      },
      (err) => {
        console.error('Error adding recipe:', err);
        alert(`Error: ${err.message}`);
      }
    );
  }

  onAddLayer() {
    const layerGroup = new FormGroup({
      layerTitle: new FormControl('', Validators.required),
      layerDescription: new FormControl('', Validators.required)
    });
    (this.addRecipeForm.get('layers') as FormArray).push(layerGroup);
  }

  get layersControls() {
    return (this.addRecipeForm.get('layers') as FormArray).controls;
  }
}
