import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, User} from "../../../../interfaces/user.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {TUNISIA_VILLES} from "../../pages/sign-up/generals";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  TUNISIA_VILLES = TUNISIA_VILLES;
  STATUS_ARRAY = ['PENDING', 'APPROVED', 'REJECTED', 'BANNED'];
  ROLE_ARRAY = ['DEFAULT', 'VENDEUR', 'TAXI', 'GUEST'];

  constructor(private userService: UserService,private  modal :NgbModal, private router: Router, private spinner: NgxSpinnerService, private toaster: ToastrService) {
  }

  user: User;
  userForm: FormGroup;
  passForm: FormGroup;
  newImage:any = '';
  imageEdited =false;
  fileImage :File ;
  collapse =  false;

  ngOnInit(): void {
    this.spinner.show()
    this.userService.getInfo().subscribe(user => {
      this.user = user as User;
      if (this.userService.isAdminRole()) {
        this.ROLE_ARRAY.unshift('ADMIN')
      }
      this.userForm = new FormGroup({
        firstname: new FormControl(this.user.firstname, [Validators.required, Validators.pattern(/^(?![\s.]+$)[a-zA-Z\s.]*$/)]),
        lastname: new FormControl(this.user.lastname, [Validators.required, Validators.pattern(/^(?![\s.]+$)[a-zA-Z\s.]*$/)]),
        email: new FormControl({value: this.user.email, disabled: true},),
        phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern(PHONE_REGEX)]),
        role: new FormControl({value: this.user.role, disabled: this.userService.isAdminRole()}),
        ville: new FormControl(this.user.ville, Validators.required),
      });
      this.spinner.hide()
    })
    this.passForm= new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
      password2 :new FormControl('', [Validators.required , Validators.pattern(PASSWORD_REGEX)]) ,
    });

  }

  editProfile() {
    const newUser: User = {
      ...this.user, ...this.userForm.value
    }
    delete newUser.password;
    this.spinner.show();
    this.userService.updateProfile(newUser).subscribe((result: any) => {
      this.toaster.success(result.message)
      this.userService.getInfo().subscribe(user => {
        this.user = user as User;
      })
      this.spinner.hide()
    }, (err) => {
      this.toaster.error(err.message)
    })
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      this.fileImage= file ;
      const reader = new FileReader();
      reader.onload = () => {
        this.newImage = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.imageEdited =true

    } else {
      console.error('Unsupported file type or no file selected.');
    }
  }

  saveImage() {
    const formData = new FormData();
    formData.append('image', this.fileImage, this.fileImage.name); // Append the image as a File

    this.spinner.show();
      this.userService.modifyImage(formData).subscribe((result: any) => {
        this.toaster.success(result.message)
        this.toaster.success(result.message)
        this.userService.getInfo().subscribe(user => {
          this.user = user as User;
          this.cancel()
        })
        this.spinner.hide()
      },(err)=>{
        this.toaster.error(err.error.message)
        this.spinner.hide()
      })
  }

  cancel() {
    this.newImage= '';
    this.imageEdited =false;
  }

  changePassword() {
    if(this.passForm.invalid)return ;
    const  id = this.user._id ;

    const updates = {
      password : this.passForm.value.password ,
      newPassword : this.passForm.value.password2,
      id: id
    }
    this.spinner.show();
    this.userService.changePassword(updates).subscribe((result: any) => {
      setTimeout(()=>{
        this.toaster.success(result.message);
        this.passForm.reset();
        this.reloadComponent()
        this.spinner.hide()
      },2000)
    },err=>{
      this.toaster.error(err.error.message)
      this.spinner.hide()
    })
  }

  deleteAccount() {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to delete your Account"
    mod.result.then(result => {
      if(result) {
        this.spinner.show()
        this.userService.deleteAccount({id: this.user._id}).subscribe((result: any) => {
          this.toaster.success(result.message) ;
          setTimeout(()=> {
            this.router.navigate(['/co-transport'])
            this.spinner.hide()
          },1000)
        },(er)=>{
          this.toaster.error("An error occurred while deleting account" , er.error.message);
          this.spinner.hide()
        })
      }
    })
  }
  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
