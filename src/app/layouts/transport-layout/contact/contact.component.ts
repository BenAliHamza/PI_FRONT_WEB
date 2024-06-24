import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {UserService} from "../../../services/user.service";
import {Reclamation} from "../../../interfaces/reclamation";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {ReclamationService} from "../../../services/reclamations/reclamation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  type = ["Paiement",'Retard',"PanneApplication"] ;
  form :FormGroup;
  user : User ;
  constructor(private  userService : UserService , private recS : ReclamationService  ,private toaster : ToastrService, private router :Router) {
    this.userService.getInfo().subscribe(user=> {
      this.user = user as User ;
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      titre : new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      type : new FormControl('Paiement', [Validators.required]),

    })
  }
  submit(){
    const  rec :Reclamation = {
      titre : this.form.value.titre  ,
      description : this.form.value.description ,
      type : this.form.value.type,
      expediteur : this.user._id
    }
    this.recS.create(rec).subscribe(res => {
      console.log(res) ;
      this.toaster.success("Your reclamation has been sent !")
      this.router.navigate(['/co-transport/list-reclamations'])
    })
  }
}
