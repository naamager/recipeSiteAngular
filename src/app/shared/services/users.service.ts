import { inject,Injectable } from '@angular/core';

import { User } from '../models/user';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  
  private http = inject(HttpClient);
  private usersURL = `${environment.apiURL}/users`;
  
  constructor(){}
 

  public set token(token: string | null) {
    if (token) {
      localStorage.setItem('mytoken', token);
    }
  }

  public get token(): string | null {
    return localStorage.getItem('mytoken');
  }


  public get connectedUser(): string | null {
    return localStorage.getItem('connectedUser');
  }

  public set connectedUser(user: string | null) {
    if (user) {
      localStorage.setItem('connectedUser', user);
    }
  }
  public set userID(id: string | null) {
    if (id) {
      localStorage.setItem('userId', id);
  
  }}

  public get connectedUserEmail(): string | null {
    return localStorage.getItem('connectedUserEmail');
  }
  
  public set connectedUserEmail(user: string | null) {
    if (user) {
      localStorage.setItem('connectedUserEmail', user);
    }
  }


  signup(addUser: User) {
    return this.http.post<{ user: User; token: string }>(
      `${this.usersURL}/signUp`,
      addUser
    );
  }

  login(addUser: User) {
    return this.http.post<{ user: User; token: string }>(
      `${this.usersURL}/signIn`,
      addUser
    );
  }

}
