import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_REGEX, PASSWORD_REGEX, User} from "../../../../interfaces/user.interface";
import {ToastrService} from "ngx-toastr";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {UserService} from "../../../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  token: string;
  userForm :FormGroup ;
  redirect = false
  constructor(private  ac :ActivatedRoute , private toaster : ToastrService,
              private router : Router , private userService :UserService ,
        private  spinner : NgxSpinnerService ) { }

  ngOnInit(): void {
    this.token = this.ac.snapshot.params['token'];
    if(!this.token){
      this.toaster.error("Invalid Link , please tryAgain") ;
     void  this.router.navigate(['/co-transport'])
    }
      this.userForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
        password2 :new FormControl('', [Validators.required , this.validateAreEqual.bind(this)]) ,
      });
    }

  onSubmit() {
    if(this.userForm.invalid) return ;
    this.spinner.show()
    this.userService.confirmNewPassword(this.token , this.userForm.value.password).subscribe(res=>{
      this.spinner.hide()
      this.toaster.success("Password reset successful");
      this.redirect= true ;
      setTimeout(()=> {
        this.router.navigate(['/co-transport/login'])
      },2000)
    },(err)=>{
      this.spinner.hide()
      this.toaster.error(err.message);
    })

  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.userForm?.get("password").value ? null : {
      NotEqual: true
    };
  }
}
