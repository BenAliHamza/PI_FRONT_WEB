import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnnonceService } from "../../../../services/annonce/annonce.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Annonce } from "../../../../interfaces/annonce";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  annonces: Annonce[] = [];
  filteredAnnonces: Annonce[] = [];
  paginatedAnnonces: Annonce[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  pages: number[] = [];

  optionsType: any[] = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];

  arraystatus = ['actif', 'brouillant', 'archivé'];

  selectedType: string = '';
  selectedStatus: string = '';
  searchTitle: string = ''; // Add searchTitle property

  constructor(
    private annonceService: AnnonceService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.annonceService.getallAnnonce().subscribe((annonces: Annonce[]) => {
      this.annonces = annonces;
      this.filterAnnonces();
      this.spinner.hide();
    }, err => {
      console.log(err);
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
    this.updatePaginatedAnnonces();
  }

  updatePaginatedAnnonces(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedAnnonces = this.filteredAnnonces.slice(start, end);
    console.log('Paginated Annonces:', this.paginatedAnnonces);
  }

  filterAnnonces(): void {
    this.filteredAnnonces = this.annonces.filter(annonce => {
      return (!this.selectedType || annonce.type === this.selectedType) &&
        (!this.selectedStatus || annonce.status === this.selectedStatus) &&
        (!this.searchTitle || annonce.titre.toLowerCase().includes(this.searchTitle.toLowerCase()));
    });
    this.totalPages = Math.ceil(this.filteredAnnonces.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);

    // Trigger change detection explicitly
    this.cdr.detectChanges();

    console.log('Filtered Annonces:', this.filteredAnnonces);
    console.log('Paginated Annonces after filter:', this.paginatedAnnonces);
  }
}
