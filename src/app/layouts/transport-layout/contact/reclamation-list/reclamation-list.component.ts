import { Component, OnInit } from '@angular/core';
import {ReclamationService} from "../../../../services/reclamations/reclamation.service";
import {Reclamation} from "../../../../interfaces/reclamation";
import {User} from "../../../../interfaces/user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {
  types = ["Paiement", "Retard", "PanneApplication"];
  isAmin = false ;
  user :User ;
  constructor(private reclamationService: ReclamationService, private ac : ActivatedRoute, private annoncesService :AnnonceService , private router :Router , private toastr : ToastrService , private  modal :NgbModal,
              private userService : UserService,private spinner : NgxSpinnerService) { }
  reclamations : Reclamation[]=[]
  filteredReclamations: Reclamation[] = [];
  selectedType: string = '';
  ngOnInit() {
    this.spinner.show()
    forkJoin([
      this.userService.getInfo(),
      this.reclamationService.getall()
    ]).subscribe(([userInfo, reclamations]) => {
      this.user = userInfo;
      this.isAmin = this.userService.isAdminRole();
      this.reclamations = reclamations as Reclamation[];
      this.filteredReclamations = this.reclamations;
      this.spinner.hide()
    });
  }
  onTypeChange() {
    if (this.selectedType) {
      this.filteredReclamations = this.reclamations.filter(rec => rec.type === this.selectedType);
    } else {
      this.filteredReclamations = this.reclamations;
    }
  }
}
