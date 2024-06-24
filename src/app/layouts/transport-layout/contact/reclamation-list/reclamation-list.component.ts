import { Component, OnInit } from '@angular/core';
import {ReclamationService} from "../../../../services/reclamations/reclamation.service";
import {Reclamation} from "../../../../interfaces/reclamation";

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {

  constructor(private reclamationService: ReclamationService,) { }
  reclamations : Reclamation[]=[]
  ngOnInit(): void {
    this.reclamationService.getall().subscribe(res => {

      this.reclamations = res as Reclamation[];
    });
  }

}
