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
import { LoginComponent } from './pages/login/login.component';
import { SimpleHeaderComponent } from './nomralUserComponent/simple-header/simple-header.component';
import { OffreComponent } from './offre/offre/offre.component';
import {RouterModule} from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OffreItemComponent } from './offre/offre-item/offre-item.component';
import { CreateReservationComponent } from './reservations/create-reservation/create-reservation.component';
import { AnnonceCreationComponent } from './annonce/annonce-creation/annonce-creation.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { SmallCardOffreComponent } from './components/small-card-offre/small-card-offre.component';
import { SmallReservationCardComponent } from './components/small-reservation-card/small-reservation-card.component';
import { AnnonceDetailsComponent } from './annonce/annonce-details/annonce-details.component';
import { AnnonceCardComponent } from './annonce/annonce-card/annonce-card.component';
import { ReservationDetailsComponent } from './reservations/reservation-details/reservation-details.component';
import { AnnonceItemComponent } from './annonce/annonce-item/annonce-item.component';
import { ReservationItemComponent } from './reservations/reservation-item/reservation-item.component';
import { AnnonceListComponent } from './annonce/annonce-list/annonce-list.component';
import { ContactComponent } from './contact/contact.component';
import { ReclamationItemComponent } from './contact/reclamation-item/reclamation-item.component';
import { ReclamationListComponent } from './contact/reclamation-list/reclamation-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {NgxSpinnerModule} from "ngx-spinner";
import { AfterSignUpModalComponent } from './modals/after-sign-up-modal/after-sign-up-modal.component';
import { ForgotPasswordComponent } from './profile/forgot-password/forgot-password.component';
import { ResetPassComponent } from './profile/reset-pass/reset-pass.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { CreateAccessoryComponent } from './store/create-accessory/create-accessory.component';
import {AuthGuard} from "../../services/auth.guard";
import { AccosoryItemComponent } from './store/accosory-item/accosory-item.component';
import { AccoryDetailsComponent } from './store/accory-details/accory-details.component';
import {MatCardModule} from "@angular/material/card";
import { ListProductComponent } from './store/list-product/list-product.component';
import { ReclamationDetailsComponent } from './contact/reclamation-details/reclamation-details.component';
import { UsercardComponent } from './profile/usercard/usercard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ComponentsModule} from "../../components/components.module";
import { UsersComponent } from './dashboard/users/users.component';
import { SmallCardUserComponent } from './dashboard/small-card-user/small-card-user.component';
import {AdminGuard} from "../../services/admin.guard";
import { AnnoncesComponent } from './dashboard/annonces/annonces.component';
import { ReservationComponent } from './dashboard/reservation/reservation.component';
import { VehiculeComponent } from './vehicule/vehicule/vehicule.component';
import { VehiculeItemComponent } from './vehicule/vehicule-item/vehicule-item.component';
import { MonOffreItemComponent } from './offre copy/mon-offre-item/mon-offre-item.component';
import { MesOffreComponent } from './offre copy/mesOffres/mes-offre.component';
import { ProduitsComponent } from './dashboard/produits/produits.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CreateCatComponent } from './dashboard/create-cat/create-cat.component';
import {AdminUserCreateComponent} from "./dashboard/create-by-admin/create-by-admin.component";
import { ReclamationComponent } from './dashboard/reclamation/reclamation.component';
import { ResponsesComponent } from './dashboard/responses/responses.component';
import {AppearDirective} from "../../services/appear";


@NgModule({
  declarations: [
    MonOffreItemComponent,
    MesOffreComponent,
    VehiculeComponent,
    TransportComponent,
    FooterComponent,
    NavbarComponent,
    NewSidebarComponent,
    SignUpComponent,
    LoginComponent,
    SimpleHeaderComponent,
    OffreComponent,
    LandingPageComponent,
    OffreItemComponent,
    VehiculeComponent,
    VehiculeItemComponent,
    CreateReservationComponent,
    AnnonceCreationComponent,
    ProfilePageComponent,
    SmallCardOffreComponent,
    SmallReservationCardComponent,
    AnnonceDetailsComponent,
    AnnonceCardComponent,
    ReservationItemComponent,
    ReservationDetailsComponent,
    AnnonceItemComponent,
    AnnonceListComponent,
    ContactComponent,
    ReclamationItemComponent,
    ReclamationListComponent,
    AfterSignUpModalComponent,
    ForgotPasswordComponent,
    ResetPassComponent,
    EditProfileComponent,
    ConfirmationModalComponent,
    CreateAccessoryComponent,
    AccosoryItemComponent,
    AccoryDetailsComponent,
    ListProductComponent,
    ReclamationDetailsComponent,
    UsercardComponent,
    DashboardComponent,
    UsersComponent,
    SmallCardUserComponent,
    AnnoncesComponent,
    ReservationComponent,
    ProduitsComponent,
    CategoriesComponent,
    CreateCatComponent,AdminUserCreateComponent, ReclamationComponent, ResponsesComponent
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
        MatButtonModule,
        NgxSpinnerModule,
        MatCardModule,
        ComponentsModule,
        AppearDirective
    ],
  providers : [AuthGuard, AdminGuard]
})
export class TransportModule { }
