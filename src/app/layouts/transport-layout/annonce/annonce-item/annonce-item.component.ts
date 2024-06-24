import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Annonce} from "../../../../interfaces/annonce";

@Component({
  selector: 'app-annonce-item',
  templateUrl: './annonce-item.component.html',
  styleUrls: ['./annonce-item.component.scss']
})
export class AnnonceItemComponent implements OnInit , AfterViewInit {
  color : 'green' | 'purple'  | 'red' = 'purple'
  @Input() annonce: Annonce;
  constructor(private el : ElementRef, private router: Router , private  render :Renderer2, private annonceSer : AnnonceService)   { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    switch (this.annonce.type){
      case "Co-Voiturage":
        this.color = "red"
        break
      case "Livraison":
        this.color ="green" ;
        break ;
      case "Taxi":
        this.color ="purple"
        break
      default:
        this.color = 'purple'
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cards.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      });
      item.addEventListener("mouseout", () => {
        cards.forEach((el) => el.classList.remove("active"));
        item.classList.remove("active");
      });

    });

  }

}
