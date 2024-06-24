import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import {FooterComponent} from "./components/footer/footer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NewSidebarComponent} from "./components/sidebar/sidebar.component";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './pages/login/login.component';
import { SimpleHeaderComponent } from './nomralUserComponent/simple-header/simple-header.component';
import { OffreComponent } from './offre/offre/offre.component';
import {RouterModule} from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateOffreComponent } from './offre/create-offre/create-offre.component';
import { CreatevehiculeComponent } from './vehicule/create-vehicule/create-vehicule.component';
import { OffreItemComponent } from './offre/offre-item/offre-item.component';
import { CreateReservationComponent } from './reservations/create-reservation/create-reservation.component';
import { AnnonceCreationComponent } from './annonce/annonce-creation/annonce-creation.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { SmallCardOffreComponent } from './components/small-card-offre/small-card-offre.component';
import { SmallReservationCardComponent } from './components/small-reservation-card/small-reservation-card.component';
import { AnnonceDetailsComponent } from './annonce/annonce-details/annonce-details.component';
import { AnnonceCardComponent } from './annonce/annonce-card/annonce-card.component';
import { ContactComponent } from './contact/contact.component';
import { ReclamationItemComponent } from './contact/reclamation-item/reclamation-item.component';
import { ReclamationListComponent } from './contact/reclamation-list/reclamation-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TransportComponent,
    FooterComponent,
    NavbarComponent,
    NewSidebarComponent,
    SignUpComponent,
    LoginComponent,
    SimpleHeaderComponent,
    OffreComponent,
    LandingPageComponent,
    CreateOffreComponent,
    CreatevehiculeComponent,
    OffreItemComponent,
    CreateReservationComponent,
    AnnonceCreationComponent,
    ProfilePageComponent,
    SmallCardOffreComponent,
    SmallReservationCardComponent,
    AnnonceDetailsComponent,
    AnnonceCardComponent,
    ContactComponent,
    ReclamationItemComponent,
    ReclamationListComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    DatePipe,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class TransportModule { }
