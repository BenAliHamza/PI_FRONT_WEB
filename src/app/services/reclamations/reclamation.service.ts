import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Reclamation} from "../../interfaces/reclamation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private  http : HttpClient) { }


  BASE = environment.BASE +"/reclamations";


  create(reclamation  :Reclamation): Observable<any>{
    return  this.http.post(this.BASE , reclamation)
  }

  getall() {
    return this.http.get(this.BASE );
  }

  getByid(id: any) {
    return this.http.get(this.BASE + '/' + id );
  }

  update(_id: string, updates: any) {
      return this.http.put(this.BASE + '/' + _id, updates)
  }
}
