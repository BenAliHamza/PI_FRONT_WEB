import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../../interfaces/reservation";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss']
})
export class ReservationItemComponent implements OnInit {
  @Input() reservation : Reservation;
  constructor(private reservationService :ReservationService , private  toaster :ToastrService , private router : Router) { }
  ngOnInit(): void {
  }

  delete() {
    this.reservationService.deleteReservation(this.reservation._id)
      .subscribe(res => {
        this.toaster.success("Reservation deleted");
        this.router.navigate(['/co-transport/profile-page']);
      })
  }
}
