import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {getToken} from "codelyzer/angular/styles/cssLexer";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-after-sign-up-modal',
  templateUrl: './after-sign-up-modal.component.html',
  styleUrls: ['./after-sign-up-modal.component.scss']
})
export class AfterSignUpModalComponent implements OnInit {
  @Input() data : {name :string ,link : string}
  constructor(private user : UserService, private  router : Router, private spinner : NgxSpinnerService , private toastr : ToastrService  ,   private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  activateAccount() {
    this.user.activateAccount(this.data.link).subscribe(
      (res:any) =>{
          if(res.message){
            this.toastr.success(res.message);
            this.toastr.info("You will be redirect in a moment  !!!! " , "Success"  )
            this.spinner.show()
            setTimeout(()=>{
              this.router.navigate(['/co-transport/login']);
              this.modal.close();
              this.spinner.hide()
            },2000)
          }
      },(e)=>{
        this.toastr.error(e.message);
        this.spinner.hide()

      }
    )
  }
}
