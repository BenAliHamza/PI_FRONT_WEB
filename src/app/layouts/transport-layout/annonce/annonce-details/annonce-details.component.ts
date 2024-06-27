import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Address, Annonce} from "../../../../interfaces/annonce";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";
import {User} from "../../../../interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {forkJoin} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehicule} from "../../../../interfaces/vehicule.interface";
import { TUNISIA_VILLES } from '../../pages/sign-up/generals';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.scss']
})
export class AnnonceDetailsComponent implements OnInit {
  TUNISIA_VILLES = TUNISIA_VILLES;

  constructor(private ac : ActivatedRoute, private annoncesService :AnnonceService , private router :Router , private toastr : ToastrService , private  modal :NgbModal,
              private userService : UserService,private spinner : NgxSpinnerService
              ) { }
  annonce :Annonce;
  user : User ;
  canEdit = false ;
  isEdit = false ;
  annonceForm: FormGroup;

  optionsType: Array<{ value: string, label: string }> = [
    { value: 'Co-Voiturage', label: 'Co-Voiturage' },
    { value: 'Livraison', label: 'Livraison' },
    { value: 'Taxi', label: 'Taxi' }
  ];
  arraystatus = ['actif', 'brouillant', 'archivé']

  ngOnInit(): void {
    const  id = this.ac.snapshot.params['id'];
    this.spinner.show()
    forkJoin({
      annonce: this.annoncesService.getAnnonceById(id),
      user: this.userService.getInfo()
    }).subscribe(({ annonce, user }) => {
      this.spinner.hide()
      this.annonce = annonce;
      this.user = user;
      this.canEdit = this.isAbleToEdit()

    });
  }

  delete() {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to delete this annonce"
    mod.result.then(res=> {
      if(res){
        this.annoncesService.delete(this.annonce._id).subscribe(res=> {
          this.toastr.success('Annonce deleted successfully.');
          void this.router.navigate(['/co-transport/list-annonces']);
        })
      }
    })

  }

  private isAbleToEdit() {
    return this.annonce.user_Id._id ===this.user._id || this.user.role ==='Admin'
  }

  submit() {
    const  locationD : Address = {
      ville : this.annonceForm.value.ville_depart,
      address : this.annonceForm.value.lieu_depart,
    }
    const locationA:Address = {
      ville : this.annonceForm.value.ville_arrive,
      address: this.annonceForm.value.lieu_arrive
    }
    const annonce:Annonce = {
      titre : this.annonceForm.value.titre  ,
      lieu_arrive : locationA,
      lieu_depart : locationD,
      heure_depart : this.convertTimeToDate(this.annonceForm.value.heure_depart),
      type : this.annonceForm.value.type,
      status : this.annonceForm.value.status,
      user_Id : this.user._id
    }
    this.spinner.show()
    this.annoncesService.updateAnnonce(this.annonce._id , {...this.annonce , ...annonce}).subscribe(
      res=> {
          this.spinner.hide();
          this.toastr.success("Annonce updated !!!!");
          location.reload()
      }
    )
  }

  startModif() {
    this.annonceForm = new FormGroup({
      titre: new FormControl(this.annonce.titre, [Validators.required]),
      lieu_depart: new FormControl(this.annonce.lieu_depart.address, [Validators.required]),
      lieu_arrive: new FormControl(this.annonce.lieu_arrive.address, [Validators.required]),
      ville_depart: new FormControl(this.annonce.lieu_depart.ville, [Validators.required]),
      ville_arrive: new FormControl(this.annonce.lieu_arrive.ville, [Validators.required]),
      heure_depart: new FormControl(this.convertDateToTime(this.annonce.heure_depart), [Validators.required]),
      type: new FormControl(this.annonce.type, [Validators.required]),
      status : new FormControl(this.annonce.status , [Validators.required])
    })
    setTimeout(()=>{
      this.isEdit = true;

    }, 500)
  }
  convertTimeToDate(time: string): Date {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    currentDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return currentDate;
  }
  cancel() {
    this.isEdit = false;
    this.annonceForm.reset();
  }
   convertDateToTime(date: Date): string {
     const dateObj = (date instanceof Date) ? date : new Date(date);
     const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
