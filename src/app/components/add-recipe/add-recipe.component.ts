import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from '../../pages/home/home.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HomeComponent],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
  private = ['yes', 'no'];
  addRecipeForm!: FormGroup;

  ngOnInit() {
    this.addRecipeForm = new FormGroup({
      /* מה שנשלח ראשון זה הערך ברירת מחדל והשני זה בדיקת תקינות */
      'recipeName': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'category': new FormControl(null),
      'time': new FormControl(null, [Validators.required]),
      'level': new FormControl(null),
      /* להתחל את התאריך להיום */
      'dateAdd': new FormControl(new Date()),
      'instructions': new FormControl(null, Validators.required),
      'layers': new FormArray([]),
      'image': new FormControl(null, Validators.required),
      'isPrivate': new FormControl('yes', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.addRecipeForm);
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
