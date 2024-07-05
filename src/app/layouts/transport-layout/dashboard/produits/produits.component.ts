import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AccesoryService } from "../../../../services/accesoires/accesory.service";
import { CategoriesService } from "../../../../services/categories/categories.service";
import { AccesoryInterface } from "../../../../interfaces/accesory.interface";
import { ICategory } from "../../../../interfaces/categories.interface";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  produits: AccesoryInterface[] = [];
  filteredProduits: AccesoryInterface[] = [];
  paginatedProduits: AccesoryInterface[] = [];
  categories: ICategory[] = [];
  selectedCategory: string = '';
  selectedEtat: string = '';
  searchText: string = '';
  sortByPrice: 'asc' | 'desc' = 'asc'; // Default to ascending order
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;
  etats: string[] = ['Vendue', 'Disponible'];

  constructor(
    private produitService: AccesoryService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private categorieService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    forkJoin({
      categories: this.categorieService.getCategories(),
      produits: this.produitService.getll()
    }).subscribe(({ categories, produits }) => {
      this.categories = categories;
      this.produits = produits as any;
      this.filterProduits();
      this.spinner.hide();
    });
  }

  changePage(page: number): void {
    if (page < 1) {
      page = 1;
    } else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.updatePaginatedProduits();
  }

  updatePaginatedProduits(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    // Apply sorting by price
    let sortedProduits = this.filteredProduits;
    if (this.sortByPrice === 'asc') {
      sortedProduits = sortedProduits.slice().sort((a, b) => a.prix - b.prix);
    } else if (this.sortByPrice === 'desc') {
      sortedProduits = sortedProduits.slice().sort((a, b) => b.prix - a.prix);
    }

    // Paginate the sorted products
    this.paginatedProduits = sortedProduits.slice(start, end);
    this.cdr.detectChanges();
  }

  filterProduits(): void {
    this.filteredProduits = this.produits.filter(produit => {
      const categoryMatch = !this.selectedCategory || produit.categorie?.nom === this.selectedCategory;
      const etatMatch = !this.selectedEtat || produit.etat === this.selectedEtat;
      const searchMatch = !this.searchText || produit.titre.toLowerCase().includes(this.searchText.toLowerCase());
      return categoryMatch && etatMatch && searchMatch;
    });
    this.totalPages = Math.ceil(this.filteredProduits.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  toggleSortOrder(): void {
    this.sortByPrice = this.sortByPrice === 'asc' ? 'desc' : 'asc';
    this.updatePaginatedProduits();
  }
}
