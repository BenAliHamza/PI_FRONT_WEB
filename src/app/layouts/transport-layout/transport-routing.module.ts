import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport.component';
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  { path: '',    pathMatch: 'full', component: TransportComponent  },
  { path : "SignUp" , component : SignUpComponent},
  { path : "login" , component : LoginComponent}


] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
