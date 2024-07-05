import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../../../../interfaces/reservation";
import {ReservationService} from "../../../../services/reservation/reservation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OffreService} from "../../../../services/offre/offre.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss']
})
export class ReservationItemComponent implements OnInit {
  @Input() reservation : Reservation;
  iseditMode = false
  protected reservationForm: FormGroup ;
   plaeDisponible: number;
  constructor(private reservationService :ReservationService , private  toaster :ToastrService ,
              private spinner : NgxSpinnerService,
              private offreService :OffreService, private router : Router , private modal :NgbModal) { }
  ngOnInit(): void {
    this.offreService.getNbrPlaceDispo(this.reservation.offre).subscribe((result: {places : number}) => {
      this.plaeDisponible = result.places ;
    })
  }

  delete() {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to delete this reservation"
    mod.result.then(res=> {
      if(res){
        this.reservationService.deleteReservation(this.reservation._id)
          .subscribe(res => {
            this.toaster.success("Reservation deleted");
            this.router.navigate(['/co-transport/profile-page']);
          })
      }
    })
  }

  startUpdate() {
    this.iseditMode = true ;
    this.reservationForm = new FormGroup({
      message : new FormControl(this.reservation.message , Validators.required),
      places : new FormControl(this.reservation.places , [Validators.required ]),
    })
  }

  submit() {
    const updates = { ...this.reservation, ...this.reservationForm.value}
    this.spinner.show()
    this.reservationService.updateReservation(updates).subscribe(res=> {
      this.toaster.success("Reservation deleted");
      this.spinner.hide()
      this.iseditMode = false ;
      location.reload()
    })
  }

  cancel() {
    this.reservationForm.reset()
    this.iseditMode =false
  }
}
