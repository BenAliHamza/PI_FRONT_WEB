import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX} from "../../../../interfaces/user.interface";
import { TUNISIA_VILLES } from './generals';
import {UserService} from "../../../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {LoginComponent} from "../login/login.component";
import {AfterSignUpModalComponent} from "../../modals/after-sign-up-modal/after-sign-up-modal.component";
import {NgxSpinner, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor( private  userService: UserService  , private toaster : ToastrService , private  ngmodel :NgbModal , private spinner :NgxSpinnerService) { }
  userForm: FormGroup;
    TUNISIA_VILLES = TUNISIA_VILLES ;
   STATUS_ARRAY = ['PENDING', 'APPROVED', 'REJECTED', 'BANNED'];
   ROLE_ARRAY = ['DEFAULT', 'VENDEUR', 'TAXI','GUEST'];
    imageData: string

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
      ville: new FormControl('Tunis', Validators.required),
      agreed : new FormControl(false, Validators.requiredTrue),
      sex : new  FormControl ('male' , [Validators.required]),
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
    if (this.userForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control.value instanceof File) {
        formData.append(key, control.value, control.value.name);
      } else {
        formData.append(key, control.value);
      }
    });
    this.spinner.show().then() ;
    this.userService.createUser(formData).subscribe((res => {
      void this.spinner.hide()
      if (res && res.confirmation_link) {
        const t = this.ngmodel.open(AfterSignUpModalComponent , {
          centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
        })
        t.componentInstance.data = { name : this.userForm.value.firstname ,link : res.confirmation_link}
      }
    }),(e)=>{
      this.spinner.hide()
     if(e.error.message ==="User email already exists"){
       this.toaster.error("User email already exists");
     }else {
       this.toaster.error(e.message)
     }
    });
  }


  // on change file
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({image: file});
    console.log(this.userForm.value)

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
        console.log(this.imageData); // Log the base64 data to debug
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file type or no file selected.');
    }
  }
}
