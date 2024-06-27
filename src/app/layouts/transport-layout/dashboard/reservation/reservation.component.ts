import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnnonceService } from "../../../../services/annonce/annonce.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ReservationService } from "../../../../services/reservation/reservation.service";
import { Reservation } from "../../../../interfaces/reservation";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  paginatedReservations: Reservation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  pages: number[] = [];

  statusOptions: ('acceptée' | 'refusé' | 'en attente')[] = ['acceptée', 'refusé', 'en attente'];

  constructor(
    private annonceService: AnnonceService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.reservationService.getall().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      this.filterReservations();
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
    this.updatePaginatedReservations();
  }

  updatePaginatedReservations(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedReservations = this.filteredReservations.slice(start, end);
    console.log('Paginated Reservations:', this.paginatedReservations);
  }

  filterReservations(): void {
    this.filteredReservations = this.reservations.filter(reservation => {
      return (!this.selectedStatus || reservation.status === this.selectedStatus);
    });
    this.totalPages = Math.ceil(this.filteredReservations.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);

    // Trigger change detection explicitly
    this.cdr.detectChanges();

    console.log('Filtered Reservations:', this.filteredReservations);
    console.log('Paginated Reservations after filter:', this.paginatedReservations);
  }

  selectedStatus: string = '';

}
