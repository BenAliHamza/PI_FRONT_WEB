import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehiculeService} from "../../../../services/vehicule/vehicule.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {Vehicule} from "../../../../interfaces/vehicule.interface";
import {OffreService} from "../../../../services/offre/offre.service";

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.scss']
})
export class CreateOffreComponent implements OnInit {
  offreForm: FormGroup;

  user :User
  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  userVehicule : Vehicule[]= [];



  constructor(private  vs :VehiculeService , private  userService : UserService , private  offreService : OffreService) { }



  ngOnInit(): void {
    this.userService.getInfo().subscribe(user=> {
      this.user = user as User  ;
      this.vs.getOneById(this.user._id).subscribe(result => {
        this.userVehicule = result ;
        console.log(result)
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

    const offre:Offre = {
      titre : this.offreForm.value.titre  ,
      lieu_arrive : locationA,
      lieu_depart : locationD,
      vehicule : this.offreForm.value.vehicule,
      heure_depart : this.convertTimeToDate(this.offreForm.value.heure_depart),
      type : this.offreForm.value.type
    }


    this.offreService.create(offre)
      .subscribe(result=> {
        console.log(result)
      })
  }

   convertTimeToDate(time: string): Date {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    currentDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return currentDate;
  }
}
