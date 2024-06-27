import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccesoryService} from "../../../../services/accesoires/accesory.service";
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {CategoriesService} from "../../../../services/categories/categories.service";
import {forkJoin} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICategory} from "../../../../interfaces/categories.interface";
import {User} from "../../../../interfaces/user.interface";
import {AccesoryInterface} from "../../../../interfaces/accesory.interface";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  category:ICategory[] = [];
  user:User
  products: AccesoryInterface[]=[]

  constructor(private  ac :ActivatedRoute , private accService :AccesoryService, private userService :UserService,
              private toast :ToastrService , private  spinner :NgxSpinnerService ,     private categoriesService :CategoriesService
    ,private accessoiresService : AccesoryService

  ) { }

  ngOnInit(): void {
    this.spinner.show()
    forkJoin({
      categorie : this.categoriesService.getCategories(),
      accessoires : this.accService.getll(),
      user : this.userService.getInfo()
    }).subscribe({
      next: ({ categorie, accessoires,user }) => {
        this.category = categorie ;
        this.products = accessoires as any;
        this.user  =user
        this.spinner.hide()

      },
      error: (error) => {
        // Handle error here
        console.error(error);
        this.toast.error(error.message)
      }
    });
  }

}
