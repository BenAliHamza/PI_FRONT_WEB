import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    TransportComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    ComponentsModule,
  ]
})
export class TransportModule { }
