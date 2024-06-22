import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport.component';
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {OffreComponent} from "./offre/offre/offre.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {CreateOffreComponent} from "./offre/create-offre/create-offre.component";
import { CreatevehiculeComponent } from './vehicule/create-offre/create-vehicule.component';


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
        path : 'createVehicule' ,component :CreatevehiculeComponent
      }
    ]},
  { path : "SignUp" , component : SignUpComponent},
  { path : "login" , component : LoginComponent}

] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
