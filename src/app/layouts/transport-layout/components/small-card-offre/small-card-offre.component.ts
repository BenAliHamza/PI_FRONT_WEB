import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {of} from "rxjs";
import {Reservation} from "../../../../interfaces/reservation";
import {Annonce} from "../../../../interfaces/annonce";

@Component({
  selector: 'app-small-card-offre',
  templateUrl: './small-card-offre.component.html',
  styleUrls: ['./small-card-offre.component.scss']
})
export class SmallCardOffreComponent implements OnInit ,AfterViewInit {
  @Input() offre :Offre |Annonce;
  @Input() isAnnonce :boolean =false
  url = ''
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.isAnnonce) {
      this.url ='/co-transport/annonce-details/' +this.offre._id ;
    }else{
      this.url ='/co-transport/offre'
    }
  }


}
