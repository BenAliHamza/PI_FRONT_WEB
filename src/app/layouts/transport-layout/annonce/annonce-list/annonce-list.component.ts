import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Annonce} from "../../../../interfaces/annonce";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {

  constructor(private annoncesService :AnnonceService , private userService :UserService, private router : Router)   { }
  annonces : Annonce[]=[]
  user: User
  filteredAnnonces: Annonce[] = [];
  selectedType: string = '';
  ngOnInit(): void {
    this.annoncesService.getallAnnonce().subscribe(res=> {
      this.annonces = res;
      this.filterAnnonces(); // Apply filter initially

    })
    this.userService.getInfo().subscribe(res=>{
      this.user = res ;
    })
  }

  filterAnnonces(): void {
    if (this.selectedType) {
      this.filteredAnnonces = this.annonces.filter(annonce => annonce.type === this.selectedType);
    } else {
      this.filteredAnnonces = this.annonces;
    }
  }

}
