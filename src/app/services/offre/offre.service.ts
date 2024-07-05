import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

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

  getById(id:String):Observable<any>{
    return  this.http.get(this.base + '/'+id);
  }
  getNbrPlaceDispo(id :string) {
    return  this.http.get(this.base + '/'+id + '/placesDisponible');
  }

}
