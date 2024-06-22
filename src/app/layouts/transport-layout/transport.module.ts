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


@NgModule({
  declarations: [
    TransportComponent,
    FooterComponent,
    NavbarComponent,
    NewSidebarComponent,
    SignUpComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    DatePipe,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TransportModule { }
