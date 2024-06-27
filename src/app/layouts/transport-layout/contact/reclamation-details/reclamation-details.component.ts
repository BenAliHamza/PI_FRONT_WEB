import { Component, OnInit } from '@angular/core';
import {Reclamation} from "../../../../interfaces/reclamation";
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ReclamationService} from "../../../../services/reclamations/reclamation.service";
import {User} from "../../../../interfaces/user.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.scss']
})
export class ReclamationDetailsComponent implements OnInit {
  reclamatoion: Reclamation;
  isAdmin = false ;
  form :FormGroup
  types = ["Paiement", "Retard", "PanneApplication"];

  private user: User;
  constructor(private  userService: UserService, private  toaster :ToastrService , private router: Router ,private recla: ReclamationService
      ,private ac : ActivatedRoute
  )  { }

  ngOnInit(): void {
    const id = this.ac.snapshot.params['id'];
    this.userService.getInfo().subscribe(res=>{
      this.user = res
    })
    this.isAdmin =  this.userService.isAdminRole()
    this.recla.getByid(id).subscribe(res=> {
      this.reclamatoion = res as any
      this.form = new FormGroup({
        titre : new FormControl(this.reclamatoion.titre, [Validators.required]),
        description: new FormControl(this.reclamatoion.description, [Validators.required]),
        type : new FormControl(this.reclamatoion.type, [Validators.required]),
      })
    })
  }

  update() {
    const updates = {
      ...this.reclamatoion, ...this.form.value
    }
    this.recla.update(this.reclamatoion._id , updates).subscribe(res=> {

    })
  }
}
