import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

export const routes: Routes = [
     { path: '', component: RecipeCardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'addRecipe', component: AddRecipeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipeCardComponent }
];
