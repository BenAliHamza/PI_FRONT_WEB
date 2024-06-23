import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {OffreService} from "../../../../services/offre/offre.service";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {Reservation} from "../../../../interfaces/reservation";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService , private OffreService: OffreService , private reservationServoice : ReservationService) { }
  user: User;
  offres :Offre[]=[] ;
  reservations : Reservation[]=[];
  ngOnInit(): void {
    this.userService.getInfo().subscribe(user=> {
      this.user = user as User;
    })
    this.reservationServoice.getUserReservation().subscribe(reservation=> {
      this.reservations = reservation ;
    })
    this.OffreService.getAllOffre()
      .subscribe(offres=> {
        this.offres = offres  as Offre[];
      })
  }

}
