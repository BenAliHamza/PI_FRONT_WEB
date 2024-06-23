import {Component, Input, OnInit} from '@angular/core';
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-offre-item',
  templateUrl: './offre-item.component.html',
  styleUrls: ['./offre-item.component.scss']
})
export class OffreItemComponent implements OnInit {
  @Input() offre!: Offre;


  constructor(private offreService: OffreService ,private userService: UserService) { }
  user : User ;
  ngOnInit(): void {
    const id = this.offre.expediteur ;
    this.userService.getById(id).subscribe(user=> {
      this.user = user ;
      console.log(this.user)
    })
  }

}
