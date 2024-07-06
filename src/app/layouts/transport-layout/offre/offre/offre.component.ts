import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  constructor(private offreService: OffreService , userService: UserService) { }

  user : User ;
  offreList : Offre []=[] ;
  ngOnInit(): void {
    this.offreService.getAllOffre().subscribe(offres => {
      this.offreList = offres  as Offre[];
      this.offreList.reverse()
    })
  }

}
