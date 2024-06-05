import { Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CategotyService } from '../../shared/services/categoty.service';
import { Category } from '../../shared/models/category';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterModule,
        MatIconModule, MatTooltipModule, MatSidenavModule, MatListModule,
        NgIconComponent, CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    viewProviders: [provideIcons({ heroPlus })]
})
export class HomeComponent {
    @ViewChild('drawer') drawer!: MatDrawer;
    private categoryService = inject(CategotyService)
    categories: Category[] = [];

    private router = inject(Router);
    ifconnect = localStorage['connectedUser'] != undefined ? true : false;
    userName = localStorage['connectedUser'] || "visitor";
    userEmail = localStorage['connectedUserEmail'];
    showAllRecipes = false;

    toggleDrawer() {
        this.drawer.toggle();
        this.categoryService.getAll().subscribe((data: any) => {
            this.categories = data.map((category: any) => category);
            console.log(this.categories, "ההההה");
        });
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }

    navigateToAdd() {
        console.log(this.ifconnect);
        this.router.navigate(['/addRecipe']);
    }

    navigateToMyRecipe() {
        if (this.showAllRecipes) {
            // Navigate to all recipes without query parameter
            this.router.navigate(['/recipes']);
        } else {
            // Navigate to user-specific recipes with query parameter
            this.router.navigate(['/recipes'], { queryParams: { userEmail: this.userEmail } });
        }
        // Toggle the showAllRecipes flag
        this.showAllRecipes = !this.showAllRecipes;
    }
}
