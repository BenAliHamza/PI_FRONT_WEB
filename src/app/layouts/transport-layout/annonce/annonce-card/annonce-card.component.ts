import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Annonce} from "../../../../interfaces/annonce";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrls: ['./annonce-card.component.scss']
})
export class AnnonceCardComponent implements OnInit, AfterViewInit {
  @Input() annonce: Annonce;
  color: string='red';
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      switch (this.annonce.type) {
        case "Taxi":
          this.color = 'red';
          break;
        case "Livraison":
          this.color = 'green'
          break;
        default:
          this.color = 'blue';
          break;
      }
      console.log(this.color)
    }, 500)
  }
  convertToReadableTime(isoString:Date) {
    const date = new Date(isoString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleString();
  }
}
