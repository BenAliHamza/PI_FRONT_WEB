import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {AccesoryInterface} from "../../../../interfaces/accesory.interface";
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-accosory-item',
  templateUrl: './accosory-item.component.html',
  styleUrls: ['./accosory-item.component.scss']
})
export class AccosoryItemComponent implements OnInit {
  @Input() accesory : AccesoryInterface;
  @Input() isOwner =false ;
  @Input() isDashboard =false ;
  isModifActivated = false ;
  @Output() updateAccesory = new EventEmitter<boolean>();
  @Input()isList?: boolean=false;
  genericImage= "assets/default.webp";
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
  launchJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'ContactSellerRoom_' + this.accesory._id,
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }
}
