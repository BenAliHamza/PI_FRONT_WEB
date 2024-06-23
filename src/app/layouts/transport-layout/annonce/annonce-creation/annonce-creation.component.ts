import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../interfaces/user.interface";
import {Vehicule} from "../../../../interfaces/vehicule.interface";
import {VehiculeService} from "../../../../services/vehicule/vehicule.service";
import {UserService} from "../../../../services/user.service";
import {OffreService} from "../../../../services/offre/offre.service";
import {TUNISIA_VILLES} from "../../pages/sign-up/generals";
import {Address, Annonce} from "../../../../interfaces/annonce";
import {AnnonceService} from "../../../../services/annonce/annonce.service";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit {
  TUNISIA_VILLES = TUNISIA_VILLES ;
  annonceForm: FormGroup;

  user :User
  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  userVehicule : Vehicule[]= [];



  constructor(private  vs :VehiculeService , private  userService : UserService , private  annonceS : AnnonceService) { }



  ngOnInit(): void {
    this.userService.getInfo().subscribe(user => {
      this.user = user as User;
      this.vs.getOneById(this.user._id).subscribe(result => {
        this.userVehicule = result;
        console.log(result)
      })
    })


    this.annonceForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      lieu_depart: new FormControl('', [Validators.required]),
      lieu_arrive: new FormControl('', [Validators.required]),
      ville_depart: new FormControl('', [Validators.required]),
      ville_arrive: new FormControl('', [Validators.required]),
      heure_depart: new FormControl('', [Validators.required]),
      vehicule: new FormControl(''),
      type: new FormControl('Co-Voiturage', [Validators.required]),
    })
  }

  submit(copy?:boolean) {
    if(this.annonceForm.invalid)return

    const  locationD : Address = {
      ville : this.annonceForm.value.ville_depart,
      address : this.annonceForm.value.lieu_depart,
    }
    const locationA:Address = {
      ville : this.annonceForm.value.lieu_arrive,
      address: this.annonceForm.value.ville_arrive
    }

    const annonce:Annonce = {
      titre : this.annonceForm.value.titre  ,
      lieu_arrive : locationA,
      lieu_depart : locationD,
      heure_depart : this.convertTimeToDate(this.annonceForm.value.heure_depart),
      type : this.annonceForm.value.type,
      status : copy? 'brouillant':'actif',
      user_Id : this.user._id
    }
    this.annonceS.create(annonce).subscribe(a => {
      console.log(a)
    })
  }


  convertTimeToDate(time: string): Date {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    currentDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return currentDate;
  }
}
