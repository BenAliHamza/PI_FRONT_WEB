import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehiculeService} from "../../../../services/vehicule/vehicule.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {Vehicule} from "../../../../interfaces/vehicule.interface";

@Component({
  selector: 'app-create-vehicule',
  templateUrl: './create-vehicule.component.html',
  styleUrls: ['./create-vehicule.component.scss']
})
export class CreatevehiculeComponent implements OnInit {
  vehiculeForm: FormGroup;

  user :User
  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  userVehicule : Vehicule[]= [];



  constructor(private  vs : VehiculeService , private  userService : UserService) { }



  ngOnInit(): void {
    this.userService.getIngo().subscribe(user=> {
      this.user = user as User  ;
      this.vs.getOneById(this.user._id).subscribe(result => {
        this.userVehicule = result ;
      })
    })


    this.vehiculeForm = new FormGroup({
      proprietaire : new FormControl('', [Validators.required]),
      marque : new FormControl('', [Validators.required]),
      model : new FormControl('', [Validators.required]),
      places : new FormControl('', [Validators.required]),
    })
  }
   
}
