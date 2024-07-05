import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Reclamation } from '../../../../interfaces/reclamation';
import { ReclamationService } from '../../../../services/reclamations/reclamation.service';
import { ReponseService } from '../../../../services/reponse.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reclamation-item',
  templateUrl: './reclamation-item.component.html',
  styleUrls: ['./reclamation-item.component.scss']
})
export class ReclamationItemComponent implements OnInit {
  @Input() rec: Reclamation;
  @Input() count: number;
  @Output() update = new EventEmitter();
  form: FormGroup;
  selectedReclamationResponse: any | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private responseService: ReponseService,
    private toastr: ToastrService, private modeal :NgbModal ,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      titre: new FormControl(this.rec.titre, [Validators.required]),
      description: new FormControl(this.rec.description, [Validators.required]),
      type: new FormControl(this.rec.type, [Validators.required])
    });

    this.loadReclamationResponse();
  }

  loadReclamationResponse(): void {
    this.responseService.getReponseByReclamationId(this.rec._id!).subscribe(res => {
      this.selectedReclamationResponse = res;
    }, err => {
      this.selectedReclamationResponse = null;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedReclamation: Reclamation = {
        ...this.rec,
        ...this.form.value
      };
      this.reclamationService.update(updatedReclamation._id!, updatedReclamation).subscribe(res => {
        this.toastr.success('Reclamation updated successfully');
        this.update.emit()

      }, err => {
        this.toastr.error('Failed to update reclamation');
      });
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  onDelete(): void {

    const mod  = this.modeal.open(ConfirmationModalComponent , {
      centered :true, backdropClass: 'light-blue-backdrop' , windowClass :'light-blue-backdrop2', size:'lg' ,
    })
    mod.componentInstance.data ="Are you sure you want to delete this Reclamation"
    mod.result.then(res=> {
      if(res){
        this.reclamationService.delete(this.rec._id!).subscribe(res => {
          this.toastr.success('Reclamation has been deleted');
          this.update.emit()
        }, err => {
          this.toastr.error('Failed to delete reclamation');
        });
      }
    })

  }
}
