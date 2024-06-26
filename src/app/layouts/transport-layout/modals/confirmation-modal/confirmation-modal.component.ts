import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() data : string  ;
  constructor(private  modal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  delete(b: boolean) {
    this.modal.close(b)
  }
}
