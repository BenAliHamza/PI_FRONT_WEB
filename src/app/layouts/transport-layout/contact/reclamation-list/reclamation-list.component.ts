import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReclamationService } from "../../../../services/reclamations/reclamation.service";
import { Reclamation } from "../../../../interfaces/reclamation";
import { User } from "../../../../interfaces/user.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../../services/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {
  types = ["Paiement", "Retard", "PanneApplication"];
  user: User;
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];
  selectedType: string = '';
  searchTitle: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private ac: ActivatedRoute,
    private cdk: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private modal: NgbModal,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getInfo().subscribe(userInfo => {
      this.user = userInfo;
      this.reclamationService.getbyUser(this.user._id).subscribe(reclamations => {
        this.reclamations = reclamations as Reclamation[];
        this.filteredReclamations = this.reclamations;
        this.spinner.hide();
      });
    });
  }

  onTypeChange() {
    this.filterReclamations();
  }

  onSearchTitleChange() {
    this.filterReclamations();
  }

  private filterReclamations() {
    this.filteredReclamations = this.reclamations.filter(rec => {
      const matchesType = this.selectedType ? rec.type === this.selectedType : true;
      const matchesTitle = rec.titre.toLowerCase().includes(this.searchTitle.toLowerCase());
      return matchesType && matchesTitle;
    });
    this.cdk.detectChanges();
  }

  changes() {
    this.ngOnInit()
  }
}
