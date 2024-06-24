import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Annonce} from "../../../../interfaces/annonce";

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {

  constructor(private annoncesService :AnnonceService)   { }
  annonces : Annonce[]=[]
  ngOnInit(): void {
    this.annoncesService.getallAnnonce().subscribe(res=> {
      this.annonces = res;
    })
  }

}
