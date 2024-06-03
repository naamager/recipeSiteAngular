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
    imports: [MatToolbarModule, MatButtonModule,RouterModule,
       MatIconModule, MatTooltipModule,MatSidenavModule,MatListModule,
        NgIconComponent,CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    viewProviders: [provideIcons({ heroPlus })]
})
export class HomeComponent {
navigateToCategory(_t28: string) {
throw new Error('Method not implemented.');
}
    @ViewChild('drawer') drawer!: MatDrawer;
    private categoryServise = inject(CategotyService)
    categories: Category[] = [];



    private router = inject(Router);
    ifconnect = localStorage['connectedUser'] != undefined ? true : false;
    userName = localStorage['connectedUser'] || "visitor";

    toggleDrawer() {
        this.drawer.toggle();
        this.categoryServise.getAll().subscribe((data: any) => {
          this.categories = data.map((category: any) => category);
          console.log( this.categories ,"ההההה");
        });
    }

    navigateToRecipes() {
        this.router.navigate(['/login']);
    }

    navigateToAdd() {
        console.log(this.ifconnect);
        this.router.navigate(['/addRecipe']);
    }

    
}
