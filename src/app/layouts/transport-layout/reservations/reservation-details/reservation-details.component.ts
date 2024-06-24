import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../../../services/offre/offre.service";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {Reservation} from "../../../../interfaces/reservation";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {

  constructor(private ac : ActivatedRoute, private offService :OffreService,
              private router : Router, private reservationService : ReservationService) { }
  reservation : Reservation;
  offre : Offre ;
  ngOnInit(): void {
    const id = this.ac.snapshot.params['id'];
    this.reservationService.getById(id).subscribe(
      resu =>{
        this.reservation = resu ;
        this.offService.getById(this.reservation.offre).subscribe(offre=> {
          this.offre= offre;
        })
      }
    )
  }

}
