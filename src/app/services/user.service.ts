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



  createUser(user :User):Observable<any> {
    return  this.http.post<User>(this.Base + '/users', user)
  }
}
