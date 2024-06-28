import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {
  types = ["Paiement", "Retard", "PanneApplication"];
  isAmin = false ;
  user :User ;
  constructor(private reclamationService: ReclamationService, private ac : ActivatedRoute, private cdk :ChangeDetectorRef , private router :Router , private toastr : ToastrService , private  modal :NgbModal,
              private userService : UserService,private spinner : NgxSpinnerService) { }
  reclamations : Reclamation[]=[]
  filteredReclamations: Reclamation[] = [];
  selectedType: string = '';
  ngOnInit() {
    this.spinner.show()
    this.userService.getInfo().subscribe(userInfo => {
      this.user = userInfo;
      this.isAmin = this.userService.isAdminRole();
      this.reclamationService.getbyUser(this.user._id).subscribe(reclamations => {
        this.reclamations = reclamations as Reclamation[];
        this.filteredReclamations = this.reclamations;
        this.spinner.hide();
      });
    });
  }
  onTypeChange() {
    if (this.selectedType) {
      this.filteredReclamations = this.reclamations.filter(rec => rec.type === this.selectedType);
    } else {
      this.filteredReclamations = this.reclamations;
    }
    this.cdk.detectChanges()
  }
}
