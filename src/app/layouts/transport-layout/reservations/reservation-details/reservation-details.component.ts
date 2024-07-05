import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../../../services/offre/offre.service";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {Reservation} from "../../../../interfaces/reservation";
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
Refuser(id: string) {
  this.reservationService.refuseReservation(id).subscribe(a=>{
    this.toastr.error("reservation reffuser")

})
}
Accepter(id:string) {
  console.log(id)
this.reservationService.acceptReservation(id).subscribe(a=>{
  this.toastr.success("reservation accepter")
})
}


  constructor(private ac : ActivatedRoute, private offService :OffreService,
              private router : Router, private reservationService : ReservationService ,
              private  userService : UserService ,private toastr : ToastrService, private spinner :NgxSpinnerService) { }
  reservation : Reservation;
  offre : Offre ;
  user:User;
  isEditMode= false ;
  ngOnInit(): void {
    const id = this.ac.snapshot.params['id'];
    this.spinner.show()
    this.reservationService.getById(id).subscribe(
      resu =>{
        this.reservation = resu ;
        this.offService.getById(this.reservation.offre).subscribe(offre=> {
          this.offre= offre;
          this.spinner.hide()
        })
      }
    )
  }

}
