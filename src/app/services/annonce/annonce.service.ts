import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Annonce} from "../../interfaces/annonce";

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  base = environment.BASE +"/annonce/";
  constructor(private http: HttpClient) { }



  create(annonce : Annonce) {
    return this.http.post<Annonce>(this.base , annonce);
  }

  delete(id: string) {
    return this.http.delete<Annonce>(this.base  + id);
  }

  getallAnnonce() {
    return this.http.get<Annonce[]>(this.base );
  }
  getAnnonceById(id :string){
    return this.http.get<Annonce>(this.base  + id );
  }
  updateAnnonce(id:string , annonce : Annonce) {
      return this.http.put<Annonce>(this.base + id , annonce);
  }
}
