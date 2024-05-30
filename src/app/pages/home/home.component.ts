import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { LoginComponent } from '../../components/login/login.component';
import { NgIconComponent } from '@ng-icons/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,
    LoginComponent,RecipeCardComponent,NgIconComponent,MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

userName=localStorage['connectedUser']||"visitor";
navigateToRecipes() {
  this.router.navigate(['/login']);
}
}
