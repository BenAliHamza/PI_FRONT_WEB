import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent implements OnInit {
  user :User ;
  isAdmin :boolean = false;
  constructor(private userService:UserService, private ac :ActivatedRoute  , private spinner:NgxSpinnerService ,
              private modal :NgbModal , private toaster : ToastrService, private router :Router ,
              ) { }

  ngOnInit(): void {
    const  id = this.ac.snapshot.params['id'] ;
    this.userService.getById(id).subscribe(res=> {
      this.user = res
    })
    this.userService.getInfo().subscribe(user => {
      if(!user) return
      this.isAdmin = this.userService.isAdminRole()
    })
  }

  delete() {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to delete " + this.user.firstname +"?"
     mod.result.then(res=> {
      if(res){
        this.spinner.show()
        this.userService.deleteAccount({id: this.user._id})
          .subscribe(res => {
            this.toaster.success("user has been deleted");
            this.router.navigate(['/co-transport/admin/users']);
            this.spinner.hide()
          })
      }
    })
  }

  approve(state?:boolean) {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data =`Are you sure you want to ${state ?"RESTORE":"APPROVE" } ` + this.user.firstname +"?"
    mod.result.then(res=> {
      if(res){
        this.spinner.show()
        this.userService.updateProfile({...this.user , status :"APPROVED"})
          .subscribe(res => {
            this.toaster.success(`user has been ${state ?"RESTORED":"APPROVED" } `);
            this.spinner.hide()
            location.reload()
          })
      }
    })
  }

  reject() {
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to REJECT " + this.user.firstname +"?"
    mod.result.then(res=> {
      if(res){
        this.spinner.show()
        this.userService.updateProfile({...this.user , status :"REJECTED"})
          .subscribe(res => {
            this.toaster.success("user has been rejected");
            this.spinner.hide()
            location.reload()
          })
      }
    })
  }

  ban(b: boolean) {
    const text = !b?"BANNE" :"RESTORE"
    const  newStatus =b ? "APPROVED" :"BANNED"
    const mod  = this.modal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data =`Are you sure you want to ${text} ` + this.user.firstname +"?"
    mod.result.then(res=> {
      if(res){
        this.spinner.show()
        this.userService.updateProfile({...this.user , status :newStatus})
          .subscribe(res => {
            this.toaster.success(`user has been ${text}d`);
            this.spinner.hide()
            location.reload()
          })
      }
    })
  }
}
