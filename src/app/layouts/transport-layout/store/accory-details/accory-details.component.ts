import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccesoryService} from "../../../../services/accesoires/accesory.service";
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AccesoryInterface} from "../../../../interfaces/accesory.interface";
import {User} from "../../../../interfaces/user.interface";
import {forkJoin} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../../services/categories/categories.service";
import {ICategory} from "../../../../interfaces/categories.interface";

@Component({
  selector: 'app-accory-details',
  templateUrl: './accory-details.component.html',
  styleUrls: ['./accory-details.component.scss']
})
export class AccoryDetailsComponent implements OnInit {
  isowner = false ;
  form : FormGroup ;
  category:ICategory[] = [];
  user:User
  product: AccesoryInterface
  isModif = false
  imageData ='';

  constructor(private  ac :ActivatedRoute , private accService :AccesoryService, private userService :UserService,
              private toast :ToastrService , private  spinner :NgxSpinnerService ,     private categoriesService :CategoriesService
    ,private accessoiresService : AccesoryService , private router:Router

              ) { }
  ngOnInit(): void {
    this.spinner.show()
    const id = this.ac.snapshot.params['id'];
    forkJoin({
      product: this.accService.getAccById(id),
      user: this.userService.getInfo(),
      categorie : this.categoriesService.getCategories()
    }).subscribe({
      next: ({ product, user , categorie }) => {
        this.product = product as any ;
        this.user = user;
        this.spinner.hide()
        this.isowner = this.checkOwnership(this.product);
        this.category = categorie ;
        console.log(this.product)
        this.form = new FormGroup({
          description : new FormControl(this.product.description, [Validators.required]),
          titre : new  FormControl(this.product.titre, [Validators.required]),
          prix  : new FormControl(this.product.prix, [Validators.required, Validators.min(0)]),
          categorie : new FormControl(this.product.categorie._id ,  [Validators.required]),
          image : new FormControl(this.product.image, [Validators.required]),
        })
      },
      error: (error) => {
        // Handle error here
        console.error(error);
        this.toast.error(error.message)
      }
    });
  }
  checkOwnership(product : AccesoryInterface){
    return product.expediteur._id == this.user._id
  }

  handleAction(state: boolean) {
      this.isModif = state
  }
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file type or no file selected.');
    }
  }

  deleteProduct() {
    this.spinner.show()
    this.accessoiresService.delete(this.product._id)
      .subscribe((reslut:any)=> {
        this.spinner.hide()
        this.toast.success("Product deleted successfully.");
        this.router.navigate(["/co-transport/products"])

      })
  }

  updateproduct() {
    this.spinner.show()
    const updates = {
      ...this.product , ...this.form.value
    }
    this.accessoiresService.update(this.product._id, updates)
    .subscribe((reslut:any)=> {
      this.toast.success("Product updated successfully.");
      this.spinner.hide()
      location.reload()
    },err=>{
      this.spinner.hide()
      this.toast.error("An erreo occur.", err );


    })
  }
}
