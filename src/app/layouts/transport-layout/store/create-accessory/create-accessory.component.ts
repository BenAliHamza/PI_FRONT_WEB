import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../interfaces/user.interface";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../../../services/user.service";
import {CategoriesService} from "../../../../services/categories/categories.service";
import {ICategory} from "../../../../interfaces/categories.interface";
import {AccesoryService} from "../../../../services/accesoires/accesory.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-accessory',
  templateUrl: './create-accessory.component.html',
  styleUrls: ['./create-accessory.component.scss']
})
export class CreateAccessoryComponent implements OnInit {

  constructor(private router : Router,
              private userService :UserService,
              private  spinner : NgxSpinnerService ,
              private categoriesService :CategoriesService
              ,private accessoiresService : AccesoryService , private toast : ToastrService) { }
  form : FormGroup ;
  user :User ;
  imageData ='';
  category:ICategory[] = [];
  ngOnInit(): void {
    this.spinner.show()
    this.categoriesService.getCategories().subscribe(res=>{
      this.category = res;
      this.spinner.hide()
      this.form = new FormGroup({
        description : new FormControl('', [Validators.required]),
        titre : new  FormControl('', [Validators.required]),
        prix  : new FormControl('', [Validators.required, Validators.min(0)]),
        categorie : new FormControl(this.category[0]._id, [Validators.required]),
        image : new FormControl('', [Validators.required]), // salim ken t7eb tkamalha
      })


    })
    this.userService.getInfo().subscribe(res=> {
      this.user = res;
    })
  }

  resetForm() {
    this.form.reset()
  }

  submit() {
    if(this.form.invalid)return;
    const formData = new FormData();
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control.value instanceof File) {
        formData.append(key, control.value, control.value.name);
      } else {
        formData.append(key, control.value);
      }
    });
    this.spinner.show()
    this.accessoiresService.createAccesory(formData).subscribe((res:any)=>{
      this.spinner.hide()
      this.form.reset();
      this.toast.success("Accessory created  !!!! " , "Thank you "+ this.user.firstname);
      this.router.navigate(['/co-transport/accossorieDetails/'+ res._id])
    },(err)=> {
      console.log(err.message)
      this.toast.error(err.message)
    })


  }
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
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
