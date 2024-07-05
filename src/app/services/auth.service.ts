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
    location.reload()

  }

  getToken(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    if (token && expiresIn) {
      const currentTime = new Date().getTime();
      const expiryTime = Number(expiresIn);

      if (currentTime < expiryTime) {
      } else {
        // Token expired, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        location.reload();
      }
    }
    return token;
  }
}
