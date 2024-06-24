import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnnonceService} from "../../../../services/annonce/annonce.service";
import {Annonce} from "../../../../interfaces/annonce";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.scss']
})
export class AnnonceDetailsComponent implements OnInit {

  constructor(private ac : ActivatedRoute, private annoncesService :AnnonceService , private router :Router , private toastr : ToastrService) { }
  annonce :Annonce
  ngOnInit(): void {
    const  id = this.ac.snapshot.params['id'];
    this.annoncesService.getAnnonceById(id).subscribe(a=> {
      this.annonce = a ;
    })
  }

  delete() {
    this.annoncesService.delete(this.annonce._id).subscribe(res=> {
      this.toastr.success('Annonce deleted successfully.');
      void this.router.navigate(['/co-transport']);
    })
  }
}
