import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";
import { Vehicule } from 'src/app/interfaces/vehicule.interface';
import { VehiculeService } from 'src/app/services/vehicule/vehicule.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {
  vehiculeForm: FormGroup;
  constructor(private offreService: OffreService , private userService: UserService, private vs: VehiculeService) { }

  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  user : User ; userVehicule : Vehicule[]= [];offreForm: FormGroup;


  
  ngOnInit(): void {
      this.userService.getInfo().subscribe(user=> {
        this.user = user as User  ;
        this.vs.getOneById(this.user._id).subscribe(result => {
          this.userVehicule = result ;
          console.log(result)
        })
      this.vs.getOneById(this.user._id).subscribe(result => {
          this.userVehicule = result ;
          console.log(result)
        })
    })
    
    this.vehiculeForm = new FormGroup({
      // proprietaire : new FormControl('', [Validators.required]),
       marque : new FormControl('', [Validators.required]),
       model : new FormControl('', [Validators.required]),
       places : new FormControl('', [Validators.required]),
     })
    }
    submit() {

      if(this.vehiculeForm.invalid)return
  
  
      const vehicule:Vehicule = {
      //  proprietaire : this.vehiculeForm.value.proprietaire  ,
        marque : this.vehiculeForm.value.marque,
        model : this.vehiculeForm.value.model,
        places : this.vehiculeForm.value.places,
      }
  
      this.vs.create(vehicule)
      .subscribe(result=> {
        console.log(result)
      })
    }
}
