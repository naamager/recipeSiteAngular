import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HomeComponent } from '../../pages/home/home.component';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, HomeComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  currentUser?: User
  login = true
  private router = inject(Router);

  private userService = inject(UsersService)
  onSubmit(form: NgForm) {
    console.log("wowowoo", form.form.value);
    console.log("wowowoo", form.form.value.userData);
    const e = form.form.value.userData
    const n= form.form.value.userData.username
    console.log("aaaaaa", n);
  debugger
    this.userService
      .signup({ userName:n, email: e.email, password: e.password, address: e.address, role: e.role })
      .subscribe((data) => {
        console.log(data);
        this.userService.token = data.token;
        const name=String(data.user.userName)
       console.log(data.user.userName);
       this.userService.connectedUser=name
        this.login = true;
        this.router.navigate(['/recipes']);
      }, (err) => {
        console.log(err);
        this.login = false;

      });
  }

}