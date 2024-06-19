import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  base = environment.BASE;


  login(email :string , password:string):Observable<any>{
    return  this.http.post(this.base + '/users/login', {email: email, password: password});
  }
  logout() {
    localStorage.removeItem('token');
    // You might also want to clear other user-related data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('expiresIn');

  }
}
