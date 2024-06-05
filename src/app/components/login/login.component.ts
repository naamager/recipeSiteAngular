import { Component, NgModule, OnInit, inject } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { HomeComponent } from '../../pages/home/home.component';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterModule, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);

  private userService = inject(UsersService)
  

  currentUser?: User;
  login = true

  onSubmit(form: NgForm) {
    console.log("wowowoo", form.form.value.email);
    const e = form.form.value.email

    this.userService
      .login({ email: e, password: form.form.value.password })
      .subscribe((data) => {
        console.log(data.user, "dataaaa");
        this.userService.token = data.token;
        const name = String(data.user.userName)
        const emailu = String(data.user.email)
        this.userService.connectedUser = name
        this.userService.connectedUserEmail = emailu
        this.login = true;
        this.router.navigate(['/recipes']);
        
      }, (err) => {
        console.log(err);
        this.login = false;

      });

  }
}

