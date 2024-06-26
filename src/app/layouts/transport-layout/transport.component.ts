import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../services/reservation/reservation.service";
import {User} from "../../interfaces/user.interface";
import {VehiculeService} from "../../services/vehicule/vehicule.service";
import {UserService} from "../../services/user.service";
import {OffreService} from "../../services/offre/offre.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-transport-layout',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private userService: UserService, private offreService: OffreService) {
  }
  user:User ;

  ngOnInit(): void {
    this.userService.getInfo().subscribe(user => {
      if(user){
        this.user = user as User;
      }
    })
  }
}
