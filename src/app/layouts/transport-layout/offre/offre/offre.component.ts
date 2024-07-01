import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";
import { Vehicule } from 'src/app/interfaces/vehicule.interface';
import { VehiculeService } from 'src/app/services/vehicule/vehicule.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  constructor(private offreService: OffreService , private userService: UserService, private vs: VehiculeService) { }

  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  user : User ; userVehicule : Vehicule[]= [];offreForm: FormGroup;
  offreList : Offre []=[] ;

  
  ngOnInit(): void {
    this.offreService.getAllOffre().subscribe(offres => {
      this.offreList = offres  as Offre[];
      this.offreList.reverse()
     
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
    })


  this.offreForm = new FormGroup({
      titre : new FormControl('', [Validators.required]),
      lieu_depart : new FormControl('', [Validators.required]),
      lieu_arrive : new FormControl('', [Validators.required]),
      ville_depart : new FormControl('', [Validators.required]),
      ville_arrive : new FormControl('', [Validators.required]),
      heure_depart : new FormControl('', [Validators.required]),
      vehicule : new FormControl(''),
      type: new FormControl('Co-Voiturage', [Validators.required]),
    })
      this.offreForm.valueChanges.subscribe(a=> {
          console.log(a)
      })
  }
submit() {
  if(this.offreForm.invalid)return

 const  locationD : LocationOffre = {
    ville : this.offreForm.value.ville_depart,
    adresse : this.offreForm.value.lieu_depart,
  }
  const locationA:LocationOffre = {
    ville : this.offreForm.value.lieu_arrive,
    adresse: this.offreForm.value.ville_arrive
  }
console.log(this.offreForm.value.dateDepart);
  const offre:Offre = {
    titre : this.offreForm.value.titre  ,
    lieu_arrive : locationA,
    lieu_depart : locationD,
    vehicule : this.offreForm.value.vehicule,
    heure_depart : this.offreForm.value.heure_depart,
    type : this.offreForm.value.type
  }


  this.offreService.create(offre)
    .subscribe(result=> {
      console.log(result)
    })
}

 convertTimeToDate(date: string , time: string): Date {
  console.log(date);
  const currentDate = new Date(date);

  console.log(currentDate.toLocaleDateString())
  const [hours, minutes] = time.split(':').map(Number);
  currentDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
  return currentDate;
}

}
