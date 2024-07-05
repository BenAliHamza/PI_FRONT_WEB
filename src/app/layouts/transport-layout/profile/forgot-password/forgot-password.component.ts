import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../../../../interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  resetConfirmed =false ;
  token : string =""
  constructor(private  authService: UserService, private router: Router , private toastr : ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) return ;
    this.spinner.show()
    this.authService.resetPassword(this.loginForm.value).subscribe((result:any)=>{
      this.spinner.hide()
      this.token = result.confirmationLink;
      if(this.token){
        this.resetConfirmed = true ;
        this.toastr.success(result.message);
      }else{
        this.toastr.error('Please Try Again ',"An error occurred");
      }
    },(error) => {
      this.spinner.hide()
      this.toastr.error('Please Try Again ',error.error.message());
    })
  }

}
