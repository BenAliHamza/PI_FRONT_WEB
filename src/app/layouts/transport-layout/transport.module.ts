import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import {FooterComponent} from "./components/footer/footer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NewSidebarComponent} from "./components/sidebar/sidebar.component";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    TransportComponent,
    FooterComponent,
    NavbarComponent,
    NewSidebarComponent,
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    DatePipe,
    NgbCollapseModule,
    NgbDropdownModule,
  ]
})
export class TransportModule { }
