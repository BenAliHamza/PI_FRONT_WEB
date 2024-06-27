import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {AccesoryInterface} from "../../../../interfaces/accesory.interface";

@Component({
  selector: 'app-accosory-item',
  templateUrl: './accosory-item.component.html',
  styleUrls: ['./accosory-item.component.scss']
})
export class AccosoryItemComponent implements OnInit {
  @Input() accesory : AccesoryInterface;
  @Input() isOwner =false ;
  isModifActivated = false ;
  @Output() updateAccesory = new EventEmitter<boolean>();
  @Input()isList?: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  handleAction() {
    if(this.isOwner) {
      this.isModifActivated = true ;
      this.updateAccesory.emit(this.isModifActivated) ;
    }else {

    }
  }
}
