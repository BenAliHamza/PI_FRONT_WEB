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
import { ListAccessoiresComponent } from './Accessoires/list-accessoires/list-accessoires.component';
import { UserAccessoiresComponent } from './Accessoires/user-accessoires/user-accessoires.component';
import { AccessoireDetailsComponent } from './Accessoires/accessoire-details/accessoire-details.component';
import { CreateAccessoireComponent } from './Accessoires/create-accessoire/create-accessoire.component';
import { EditAccessoireComponent } from './Accessoires/edit-accessoire/edit-accessoire.component';
import { ListCategoriesComponent } from './Categories/list-categories/list-categories.component';
import { CreateCategoryComponent } from './Categories/create-category/create-category.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './Categories/category-details/category-details.component';
import { ListCategorieFavorieComponent } from './CategorieFavorie/list-categorie-favorie/list-categorie-favorie.component';
import { CreateCategorieFavorieComponent } from './CategorieFavorie/create-categorie-favorie/create-categorie-favorie.component';
import { EditCategorieFavorieComponent } from './CategorieFavorie/edit-categorie-favorie/edit-categorie-favorie.component';


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
    ListAccessoiresComponent,
    UserAccessoiresComponent,
    AccessoireDetailsComponent,
    CreateAccessoireComponent,
    EditAccessoireComponent,
    ListCategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    ListCategorieFavorieComponent,
    CreateCategorieFavorieComponent,
    EditCategorieFavorieComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    DatePipe,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TransportModule { }
