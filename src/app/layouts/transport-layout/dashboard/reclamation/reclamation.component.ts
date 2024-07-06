import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from '../../../../interfaces/reclamation';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReclamationService } from '../../../../services/reclamations/reclamation.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReponseService } from '../../../../services/reponse.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];
  paginatedReclamations: Reclamation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pages: number[] = [];
  totalPages: number = 0;

  selectedType: string = '';
  selectedEtat: string = '';
  searchText: string = '';

  types: string[] = ['Paiement', 'Retard', 'PanneApplication'];
  etats: string[] = ['En attente', 'Traiter'];

  reclamationForm: FormGroup;
  responseForm: FormGroup;
  selectedReclamation: Reclamation | null = null;
  selectedReclamationResponse: any | null = null;
  isEditingResponse: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private reclamationService: ReclamationService,
    private modal: NgbModal,
    private responseService: ReponseService
  ) {
    this.reclamationForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.responseForm = this.fb.group({
      reponse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.spinner.show();
    this.reclamationService.getall().subscribe((res: any) => {
      this.reclamations = res;
      this.filterReclamations();
      this.spinner.hide();
    }, err => {
      this.toastr.error('Failed to load reclamations');
      this.spinner.hide();
    });
  }

  changePage(page: number): void {
    if (page < 1) {
      page = 1;
    } else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.updatePaginatedReclamations();
  }

  updatePaginatedReclamations(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedReclamations = this.filteredReclamations.slice(start, end);
  }

  filterReclamations(): void {
    this.filteredReclamations = this.reclamations.filter(reclamation => {
      return (!this.selectedType || reclamation.type === this.selectedType) &&
        (!this.selectedEtat || reclamation.etat === this.selectedEtat) &&
        (!this.searchText || reclamation.titre.toLowerCase().includes(this.searchText.toLowerCase()));
    });
    this.totalPages = Math.ceil(this.filteredReclamations.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
    this.onCancel()
  }

  onReclamationClick(reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
    this.reclamationForm.patchValue({
      titre: reclamation.titre,
      description: reclamation.description,
      type: reclamation.type
    });

    // Check if there is a response for the selected reclamation
    this.responseService.getReponseByReclamationId(reclamation._id!).subscribe(res => {
      this.selectedReclamationResponse = res;
    }, err => {
      this.selectedReclamationResponse = null;
    });
  }

  onCancel(): void {
    this.selectedReclamation = null;
    this.selectedReclamationResponse = null;
    this.isEditingResponse = false;
    this.reclamationForm.reset();
    this.responseForm.reset();
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      this.spinner.show();
      const updatedReclamation: Reclamation = {
        ...this.selectedReclamation,
        ...this.reclamationForm.value
      };
      this.reclamationService.update(updatedReclamation._id!, updatedReclamation).subscribe(res => {
        this.toastr.success('Reclamation updated successfully');
        this.spinner.hide();
        this.onCancel();
        this.loadReclamations();
      }, err => {
        this.toastr.error('Failed to update reclamation');
        this.spinner.hide();
      });
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  onDelete(): void {
    if (this.selectedReclamation) {
      const mod = this.modal.open(ConfirmationModalComponent, {
        centered: true, backdropClass: 'light-blue-backdrop', windowClass: 'light-blue-backdrop2', size: 'lg',
      })
      mod.componentInstance.data = "Are you sure you want to delete this reclamation?";
      mod.result.then(res => {
        if (res) {
          this.reclamationService.delete(this.selectedReclamation._id!)
            .subscribe(res => {
              this.toastr.success("Reclamation has been deleted");
              this.ngOnInit();
            });
        }
      });
    }
  }

  onRespond(): void {
    if (this.responseForm.valid && this.selectedReclamation) {
      this.spinner.show();
      const response = {
        reclamation: this.selectedReclamation._id,
        expediteur: this.selectedReclamation.expediteur._id,
        reponse: this.responseForm.value.reponse
      };
      this.responseService.createReponse(response).subscribe(res => {
        this.toastr.success('Response sent successfully');
        this.spinner.hide();
        this.onCancel();
        this.loadReclamations();
      }, err => {
        this.toastr.error('Failed to send response');
        this.spinner.hide();
      });
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  onUpdateResponseClick(): void {
    if (this.selectedReclamationResponse) {
      this.isEditingResponse = true;
      this.responseForm.patchValue({
        reponse: this.selectedReclamationResponse.reponse
      });
    }
  }

  onUpdateResponse(): void {
    if (this.responseForm.valid && this.selectedReclamation && this.selectedReclamationResponse) {
      this.spinner.show();
      const updatedResponse = {
        ...this.selectedReclamationResponse,
        reponse: this.responseForm.value.reponse
      };
      this.responseService.updateReponse(this.selectedReclamationResponse._id, updatedResponse).subscribe(res => {
        this.toastr.success('Response updated successfully');
        this.spinner.hide();
        this.onCancel();
        this.loadReclamations();
      }, err => {
        this.toastr.error('Failed to update response');
        this.spinner.hide();
      });
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  onDeleteResponse(): void {
    if (this.selectedReclamationResponse) {
      const mod = this.modal.open(ConfirmationModalComponent, {
        centered: true, backdropClass: 'light-blue-backdrop', windowClass: 'light-blue-backdrop2', size: 'lg',
      });
      mod.componentInstance.data = "Are you sure you want to delete this response?";
      mod.result.then(res => {
        if (res) {
          this.spinner.show();
          this.responseService.deleteReponse(this.selectedReclamationResponse._id).subscribe(res => {
            this.toastr.success("Response has been deleted");
            this.selectedReclamationResponse = null;
            this.spinner.hide();
          }, err => {
            this.toastr.error('Failed to delete response');
            this.spinner.hide();
          });
        }
      });
    }
  }
}
