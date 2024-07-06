import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Vehicule} from "../../interfaces/vehicule.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private  base = environment.BASE + "/Vehicules"
  constructor(private  http : HttpClient) {}

  create(vehicule : Vehicule) {
    return this.http.post<Vehicule>(this.base , vehicule);
  }
  getAllVehicules() {
    return this.http.get<Vehicule[]>(this.base);
  }
  getVehiculeById(id: string) {
    return this.http.get<Vehicule>(this.base + "/" + id);
  }
  deleteVehicule(id : string) {
    return this.http.delete<Vehicule>(this.base + '/'+ id);
  }

  updateVehicule(id :string , vehicule : Vehicule) {
    return this.http.put<Vehicule>(this.base + '/' +id , vehicule) ;
  }
  getOneById(idUser :string):Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.base + "?proprietaire="+idUser);
  }
  
}
