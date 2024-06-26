import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {OffreService} from "../../../../services/offre/offre.service";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {Reservation} from "../../../../interfaces/reservation";
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Annonce} from "../../../../interfaces/annonce";
import {forkJoin} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserService , private OffreService: OffreService , private reservationServoice : ReservationService ,
              private  annonceSer : AnnonceService , private  spinner : NgxSpinnerService) { }
  user: User;
  offres :Offre[]=[] ;
  reservations : Reservation[]=[];
  annonces : Annonce[]=[];
  ngOnInit(): void {
    this.spinner.show()
    forkJoin({
      user: this.userService.getInfo(),
      reservation: this.reservationServoice.getUserReservation(),
      offres: this.OffreService.getAllOffre(),
      annonces: this.annonceSer.getallAnnonce()
    }).subscribe(results => {
      this.user = results.user as User;
      this.reservations = results.reservation;
      this.offres = results.offres as Offre[];
      this.annonces = results.annonces;
      this.spinner.hide()
    });

  }

}
