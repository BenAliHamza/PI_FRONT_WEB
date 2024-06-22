import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_REGEX, PASSWORD_REGEX} from "../../../../interfaces/user.interface";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ,'../sign-up/sign-up.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private  authService: AuthService, private router: Router , private toastr : ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX) // Must include lowercase, uppercase, and number
      ])
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          if (response.message === 'Login successful') {
            this.toastr.success('Login successful');
            localStorage.setItem('token', response.token);
            localStorage.setItem('expiresIn', response.expiresIn.toString());
            // Navigate to a different page if needed
            this.router.navigate(['/co-transport']).then();
          }
        },
        (error: any) => {
          if (error.error.message === 'User not found') {
            this.toastr.info('User not found');
          } else if (error.error.message === 'The password you entered is incorrect') {
            this.toastr.info('The password you entered is incorrect');
          } else {
            this.toastr.info('An error occurred. Please try again.');
          }
        }
      );
    } else {
      this.toastr.info('Form is invalid');
    }
  }

}
