import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport.component';
import { SignUpComponent} from "./pages/sign-up/sign-up.component";
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
import {CreateAccessoryComponent} from "./store/create-accessory/create-accessory.component";
import {AuthGuard} from "../../services/auth.guard";
import {AccoryDetailsComponent} from "./store/accory-details/accory-details.component";
import {ListProductComponent} from "./store/list-product/list-product.component";
import {ReclamationDetailsComponent} from "./contact/reclamation-details/reclamation-details.component";
import {UsercardComponent} from "./profile/usercard/usercard.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./dashboard/users/users.component";
import {AdminGuard} from "../../services/admin.guard";
import {AnnoncesComponent} from "./dashboard/annonces/annonces.component";
import {ReservationComponent} from "./dashboard/reservation/reservation.component";
import {ProduitsComponent} from "./dashboard/produits/produits.component";
import {CategoriesComponent} from "./dashboard/categories/categories.component";
import {CreateCatComponent} from "./dashboard/create-cat/create-cat.component";
import {AdminUserCreateComponent} from "./dashboard/create-by-admin/create-by-admin.component";



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
      }, {
        path :"create-product" , canActivate: [AuthGuard] ,  component : CreateAccessoryComponent
      } , {
        path : "accossorieDetails/:id" , component  : AccoryDetailsComponent
      },{
    path :"products" , component :ListProductComponent
      }, {
        path :'details-reclamation/:id' , component : ReclamationDetailsComponent
      },{
        path : "userCard/:id", component : UsercardComponent
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
  , {
    path :"admin" , canActivate : [AdminGuard] , component  : DashboardComponent, children : [
      {
        path:  "" , pathMatch: "full" , redirectTo : '',
      },
      {
        path: "users" , component : UsersComponent,
      },
      {
        path :'userCard/:id' , component : UsercardComponent,
      },{
        path:  "annonces" , component: AnnoncesComponent
      },{
        path:  "reservations" , component: ReservationComponent
      },{
        path :"reservationDetails/:id" , component : ReservationDetailsComponent},
      {
        path : "annonce-details/:id" , component : AnnonceDetailsComponent
      },{
         path : "produits" , component : ProduitsComponent
      },{
        path : "accossorieDetails/:id" , component  : AccoryDetailsComponent
      },{
        path : "categories"  , component :CategoriesComponent
      },{
        path : "createCategorie"  , component :CreateCatComponent
      },{
        path : "createUser" , component :AdminUserCreateComponent
      }
    ]
  }
] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
