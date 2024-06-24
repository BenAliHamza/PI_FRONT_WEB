import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../../interfaces/reclamation";

@Component({
  selector: 'app-reclamation-item',
  templateUrl: './reclamation-item.component.html',
  styleUrls: ['./reclamation-item.component.scss']
})

export class ReclamationItemComponent implements OnInit, AfterViewInit {
  @Input() rec : Reclamation
  @Input() count!: number;
  backgroundColor =''
   types = ["Paiement", "Retard", "PanneApplication"];

  constructor() { }

  ngOnInit(): void {
  }
  getBackgroundColor(type: string) {
    switch (type) {
      case "Paiement":
         this.backgroundColor ="rgba(120,182,209,0.69)"; // Gold
        break;
      case "Retard":
        this.backgroundColor =  "rgba(255,99,71,0.74)"; // Tomato
        break ;
      case "PanneApplication":
        this.backgroundColor =  "rgba(178,93,234,0.71)"; // DodgerBlue
        break
      default:
        this.backgroundColor  = "#FFFFFF"; // Default white background
    }
  }

  ngAfterViewInit(): void {
    this.getBackgroundColor(this.rec.type)
  }
}
