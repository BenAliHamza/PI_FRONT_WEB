import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http: HttpClient) { }

  base = environment.BASE + "/offres";
  create(offre: Offre) {
    return this.http.post(this.base, offre);
  }

  update(id: string,offre: Offre) {
    return this.http.put(this.base + '/' + id, offre);
  }

  ajoutSub(topic:string){
    this.http.post("http://localhost:3000/subscriptions",{topic : topic})
  }

  getAllOffre() {
    return this.http.get(this.base);
  }
  getAdminOffre() {
    return this.http.get(this.base + '/all');
  }
  getOffreWithFilter(params: any) {
    const filter: {titre?:string , type?:string} = {};

    if(params.titre){
      filter.titre = params.titre;
    }
    if(params.type){
      filter.type = params.type
    }
   //   console.log(queryParams.getAll)
      return this.http.get(this.base, { params: {...filter} });
    }
  consulter() {
    return this.http.get(this.base + '/consulter');
  }

  getById(id: String): Observable<any> {
    return this.http.get(this.base + '/' + id);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(this.base + '/' + id);
  }
  getNbrPlaceDispo(id: string) {
    return this.http.get(this.base + '/' + id + '/placesDisponible');
  }

}
