import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccesoryService } from "../../../../services/accesoires/accesory.service";
import { UserService } from "../../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { CategoriesService } from "../../../../services/categories/categories.service";
import { forkJoin } from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ICategory } from "../../../../interfaces/categories.interface";
import { User } from "../../../../interfaces/user.interface";
import { AccesoryInterface } from "../../../../interfaces/accesory.interface";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  categories: ICategory[] = [];
  etats: string[] = ['Vendue', 'Disponible'];
  user: User;
  products: AccesoryInterface[] = [];
  paginatedProduits: AccesoryInterface[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  selectedEtat: string = '';
  sortByPrice: string = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 6; // Adjust as needed
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private ac: ActivatedRoute, 
              private accService: AccesoryService, 
              private userService: UserService,
              private toast: ToastrService, 
              private spinner: NgxSpinnerService, 
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.spinner.show();
    forkJoin({
      categorie: this.categoriesService.getCategories(),
      accessoires: this.accService.getll(),
      user: this.userService.getInfo()
    }).subscribe({
      next: ({ categorie, accessoires, user }) => {
        this.categories = categorie;
        this.products = accessoires as any;
        this.user = user;
        this.spinner.hide();
        this.filterProduits(); // Apply initial filter and pagination
      },
      error: (error) => {
        console.error(error);
        this.toast.error(error.message);
        this.spinner.hide();
      }
    });
  }

  filterProduits(): void {
    let filtered = this.products;

    if (this.searchText) {
      filtered = filtered.filter(product => product.titre.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.categorie?.nom === this.selectedCategory);
    }

    if (this.selectedEtat) {
      filtered = filtered.filter(product => product.etat === this.selectedEtat);
    }

    if (this.sortByPrice === 'asc') {
      filtered.sort((a, b) => a.prix - b.prix);
    } else {
      filtered.sort((a, b) => b.prix - a.prix);
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginate(filtered);
  }

  toggleSortOrder(): void {
    this.sortByPrice = this.sortByPrice === 'asc' ? 'desc' : 'asc';
    this.filterProduits();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterProduits();
    }
  }

  paginate(products: AccesoryInterface[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProduits = products.slice(start, end);
  }
}
