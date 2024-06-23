import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Base = environment.BASE;
  constructor(private  http :  HttpClient) { }


  getInfo(){
    return this.http.get(this.Base + '/users/info')
  }
  createUser(user :User):Observable<any> {
    return  this.http.post<User>(this.Base + '/users', user)
  }
}
