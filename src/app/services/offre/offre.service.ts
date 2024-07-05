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

  getAllOffre() {
    return this.http.get(this.base);
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
  getNbrPlaceDispo(id: string) {
    return this.http.get(this.base + '/' + id + '/placesDisponible');
  }

}
