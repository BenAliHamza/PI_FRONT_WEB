import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Base = environment.BASE;
  constructor(private  http :  HttpClient) { }
  private  isAdmin = false ;

  getInfo(){
    return this.http.get(this.Base + '/users/info').pipe(tap((user:User)=> {
      this.isAdmin = user.role ==='ADMIN'
    }))
  }
  createUser(user :FormData):Observable<any> {
    return  this.http.post<User>(this.Base + '/users', user)
  }


  getById(id : string):Observable<User> {
    return this.http.get<User>(this.Base + '/users/byId/' + id )
  }
  activateAccount(token :string){
    return this.http.post(this.Base + `/users/activate_account/${token}` , {})
  }
  resetPassword(email : string){
    return this.http.post(this.Base + `/users/forgetPassword` , email)
  }

  confirmNewPassword(token :string , newPassword:string):Observable<any> {
    return this.http.post(this.Base + `/users/reset_password_confirmation/${token}` , {newPassword : newPassword})

  }

  updateProfile(newUser: User) {
    return this.http.put(this.Base + `/users/updateById/${newUser._id}` , newUser);
  }
  isAdminRole(){
    return this.isAdmin
  }

  modifyImage(formData: FormData) {
    return this.http.put(this.Base + `/users/updateImage` , formData);

  }

  changePassword(form : any) {
    return this.http.put(this.Base + `/users/changePassword` , form);

  }

  deleteAccount(param: { id: string }) {
    return this.http.delete(this.Base + `/users/delete/${param.id}`)
  }
}
