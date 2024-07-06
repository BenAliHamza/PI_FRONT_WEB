import {Component, Input, OnInit} from '@angular/core';
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import { Vehicule } from 'src/app/interfaces/vehicule.interface';
import { VehiculeService } from 'src/app/services/vehicule/vehicule.service';

@Component({
  selector: 'app-vehicule-item',
  templateUrl: './vehicule-item.component.html',
  styleUrls: ['./vehicule-item.component.scss']
})
export class VehiculeItemComponent implements OnInit {
  @Input() vehicule!: Vehicule;


  constructor(private vehiculeService: VehiculeService ,private userService: UserService) { }
  user : User ;
  ngOnInit(): void {
    const id = this.vehicule.proprietaire ;
    this.userService.getById(id).subscribe(user=> {
      this.user = user; 
    })
  }

  deleteVehicule(){
    this.vehiculeService.deleteVehicule(this.vehicule._id).subscribe(res => console.log(res))
  }
} 
