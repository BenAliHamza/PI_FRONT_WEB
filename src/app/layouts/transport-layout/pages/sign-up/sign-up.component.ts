import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX} from "../../../../interfaces/user.interface";
import { TUNISIA_VILLES } from './generals';
import {UserService} from "../../../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor( private  userService: UserService , private  modal : NgbModal , private toaster : ToastrService) { }
  userForm: FormGroup;
    TUNISIA_VILLES = TUNISIA_VILLES ;
   STATUS_ARRAY = ['PENDING', 'APPROVED', 'REJECTED', 'BANNED'];
   ROLE_ARRAY = ['DEFAULT', 'ADMIN', 'TAXI'];
  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required , Validators.pattern(/^(?![\s.]+$)[a-zA-Z\s.]*$/)]),
      lastname: new FormControl('', [Validators.required , Validators.pattern(/^(?![\s.]+$)[a-zA-Z\s.]*$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
      password2 :new FormControl('', [Validators.required , this.validateAreEqual.bind(this)]) ,
      phone: new FormControl('' , [Validators.required , Validators.pattern(PHONE_REGEX) ]),
      image: new FormControl(''),
      role: new FormControl('DEFAULT'),
      ville: new FormControl('', Validators.required),
      agreed : new FormControl(false, Validators.requiredTrue)
    } );
    this.userForm.valueChanges.subscribe(async value => {
      console.log(value)
    })
  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.userForm?.get("password").value ? null : {
      NotEqual: true
    };
  }

  submitForm() {
    if(this.userForm.invalid)return
    this.userService.createUser(this.userForm.value).subscribe((res=>{
      if( res && res.confirmation_link) {
        this.toaster.success(res.message , "Thank you and Welcome")
        console.log(res);
      }
    }))
  }
}
