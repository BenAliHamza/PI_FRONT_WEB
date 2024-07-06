import {Component, Input, OnInit} from '@angular/core';
import {OffreService} from "../../../../services/offre/offre.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-mon-offre-item',
  templateUrl: './mon-offre-item.component.html',
  styleUrls: ['./mon-offre-item.component.scss']
})
export class MonOffreItemComponent implements OnInit {
  @Input() offre!: Offre;


  constructor(private offreService: OffreService ,private userService: UserService) { }
  user : User ;
  ngOnInit(): void {
    const id = this.offre.expediteur ;
    this.userService.getById(id).subscribe(user=> {
      this.user = user ;
    })



  }

  delete(id:any){
    this.offreService.delete(id).subscribe(res => console.log(res));
    }
}
