import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport.component';
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {OffreComponent} from "./offre/offre/offre.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {CreateOffreComponent} from "./offre/create-offre/create-offre.component";
import { CreatevehiculeComponent } from './vehicule/create-vehicule/create-vehicule.component';
import {CreateReservationComponent} from "./reservations/create-reservation/create-reservation.component";
import {AnnonceCreationComponent} from "./annonce/annonce-creation/annonce-creation.component";
import {ProfilePageComponent} from "./profile/profile-page/profile-page.component";
import {AnnonceDetailsComponent} from "./annonce/annonce-details/annonce-details.component";
import {ReservationDetailsComponent} from "./reservations/reservation-details/reservation-details.component";
import {AnnonceListComponent} from "./annonce/annonce-list/annonce-list.component";
import {ContactComponent} from "./contact/contact.component";
import {ReclamationListComponent} from "./contact/reclamation-list/reclamation-list.component";
import {ForgotPasswordComponent} from "./profile/forgot-password/forgot-password.component";
import {ResetPassComponent} from "./profile/reset-pass/reset-pass.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";



const routes: Routes = [
  { path: '', component: TransportComponent  , children  : [
      {
        path : '', pathMatch : "full" ,component :LandingPageComponent
      },
      {
        path : 'offre' ,component :OffreComponent
      },
      {
        path : 'createOffre' ,component :CreateOffreComponent
      },
      {
        path : 'createvehicule' ,component :CreatevehiculeComponent ,
      },
      {
        path : "createReservation/:id" , component :CreateReservationComponent
      },{
        path :"reservationDetails/:id" , component : ReservationDetailsComponent},
      {
        path : "createAnnonce" , component : AnnonceCreationComponent
      }, {
        path : "annonce-details/:id" , component : AnnonceDetailsComponent
      },{
        path : "list-annonces" , component : AnnonceListComponent
      },
      {
        path :'profile-page' , component :ProfilePageComponent
      }, {
        path : "profile-edit" , component: EditProfileComponent
      }, {
        path : "contact-us" , component : ContactComponent
      }, {
          path :"list-reclamations" , component :ReclamationListComponent
      }
    ]},
  { path : "SignUp" , component : SignUpComponent},
  { path : "login" , component : LoginComponent},
  {
    path :"resetPassword" , component : ForgotPasswordComponent
  },
  {
    path : "reset_password_confirmation/:token" , component : ResetPassComponent
  }

] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
