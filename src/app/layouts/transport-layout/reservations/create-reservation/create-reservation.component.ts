import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../../../services/offre/offre.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehiculeService} from "../../../../services/vehicule/vehicule.service";
import {Vehicule} from "../../../../interfaces/vehicule.interface";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {Reservation} from "../../../../interfaces/reservation";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {

  constructor(private router :Router ,
              private activatedR :ActivatedRoute,
              private offreService :OffreService ,
              private vs :VehiculeService,
              private reservationService :ReservationService) { }
  offre : Offre;
  reservationForm: FormGroup
  plaeDisponible : number ;
  ngOnInit(): void {

    const offreId = this.activatedR.snapshot.params['id'];
    this.offreService.getById(offreId).subscribe(offer => {
      this.offre= offer as Offre;
      this.offreService.getNbrPlaceDispo(this.offre._id).subscribe((result: {places : number}) => {
        this.plaeDisponible = result.places ;
      })
    })
    this.reservationForm = new FormGroup({
      message : new FormControl('' , Validators.required),
      places : new FormControl('' , [Validators.required ]),
    })

  }

  submit() {
    if(this.reservationForm.invalid)return ;

    const data:Reservation  = {
      message : this.reservationForm.value.message ,
      places : +this.reservationForm.value.places ,
      offre : this.offre._id
    }
    this.reservationService.create(data).subscribe(result=> {
      console.log(result);
    })
  }
}
