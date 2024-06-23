import {Component, Input, OnInit} from '@angular/core';
import {of} from "rxjs";
import {Reservation} from "../../../../interfaces/reservation";

@Component({
  selector: 'app-small-card-offre',
  templateUrl: './small-card-offre.component.html',
  styleUrls: ['./small-card-offre.component.scss']
})
export class SmallCardOffreComponent implements OnInit {
  @Input() offre :Offre;
  constructor() { }

  ngOnInit(): void {
  }

  protected readonly of = of;
}
