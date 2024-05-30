import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component ,NgModule,importProvidersFrom,inject} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { routes } from './app.routes';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { HomeComponent } from './pages/home/home.component';

/* const appRoutes:Routes=[
  {path:'login',component: LoginComponent},
  {path:'signUp',component: SignUpComponent},
  {path:'addRecipe',component: AddRecipeComponent}
] */

@Component({
  selector: 'app-root', 
  standalone: true,
  // imports: [UpperCasePipe],
  imports: [CommonModule,FormsModule,
    LoginComponent,SignUpComponent,AddRecipeComponent,RecipeCardComponent,HomeComponent,
   RouterOutlet, RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})

export class AppComponent {
  name = 'naama';
  private UsersService = inject(UsersService); 

}
bootstrapApplication(AppComponent/* , {
  providers: [
    // Import RouterModule.forRoot(appRoutes) providers for bootstrap
    importProvidersFrom(RouterModule.forRoot(appRoutes))
  ]
} */);