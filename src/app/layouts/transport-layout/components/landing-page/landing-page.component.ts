import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import { Annonce } from "../../../../interfaces/annonce";
import { AccesoryInterface } from "../../../../interfaces/accesory.interface";
import { OffreService } from "../../../../services/offre/offre.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AnnonceService } from "../../../../services/annonce/annonce.service";
import { UserService } from "../../../../services/user.service";
import { AccesoryService } from "../../../../services/accesoires/accesory.service";
import { User } from "../../../../interfaces/user.interface";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  offres: Offre[] = [];
  annonces: Annonce[] = [];
  products: AccesoryInterface[] = [];
  users: User[] = [];
  constructor(
    private offreService: OffreService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private annonceService: AnnonceService,
    private userService: UserService,
    private productService: AccesoryService,
    private  renderer :Renderer2 ,
    private  el :ElementRef
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.productService.getll(),
      this.userService.getall(),
      this.annonceService.getallAnnonce(),
      this.offreService.getAllOffre()
    ]).subscribe({
      next: ([products, users, annonces, offres]) => {
        this.offres = this.getRandomItems(offres as any, 5);
        // @ts-ignore
        this.users = this.getRandomItems(users.users as any, 5);
        this.products = this.getRandomItems(products as any, 5);
        this.annonces = this.getRandomItems(annonces as any, 5);
        this.spinner.hide();

      },
      error: (error) => {
        console.error(error);
        this.toastrService.error(error.message);
        this.spinner.hide();
      }
    });
  }

  ngAfterViewInit(): void {

  }

   animateSections(section :string): void {
      const c = this.el.nativeElement.querySelector('.'+section) ;
      this.renderer.addClass(c, 'animate-in')
  }

  protected animateCards(selector: string, animationClass: string): void {
    const cards = this.el.nativeElement.querySelectorAll(selector);
    const delay = 100;

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add(animationClass);
      }, index * delay);
    });
  }

  private getRandomItems<T>(items: T[], count: number): T[] {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
