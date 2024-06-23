import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private  http: HttpClient) { }

  base = environment.BASE +"/offres";
  create(offre : Offre){
   return  this.http.post(this.base , offre);
  }

  getAllOffre(){
    return  this.http.get(this.base);
  }
}
