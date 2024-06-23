import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../../interfaces/reservation";
import {beforeMain} from "@popperjs/core";

@Component({
  selector: 'app-small-reservation-card',
  templateUrl: './small-reservation-card.component.html',
  styleUrls: ['./small-reservation-card.component.scss']
})
export class SmallReservationCardComponent implements OnInit {
  @Input() res :Reservation;
  class ='a'
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    switch (this.res.status){
      case "acceptée":
        this.class= '';
        break ;
      case "refusé":
        this.class= 'r'
        break ;
      default:
        this.class= 'e';
    }
  }

}
