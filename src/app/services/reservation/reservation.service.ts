import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Reservation, ReservationStatus} from "../../interfaces/reservation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  base = environment.BASE +"/reservation";
  constructor(private  http :HttpClient , private  authService:AuthService) { }

  create(reservation :Reservation) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.authService.getToken()}`});
    return this.http.post<Reservation>(this.base,reservation);
  }

  getUserReservation() {
    return this.http.get<Reservation[]>(this.base );
  }
  updateReservation(reservation :Reservation) {
    return this.http.put<Reservation>(this.base+'/'+ reservation._id,reservation);
  }
  deleteReservation(id:string){
    return  this.http.delete<Reservation>(this.base+'/'  + id);
  }
  getReservationByFilter(status : string){
    return this.http.get<Reservation[]>(this.base  + status);
  }
  acceptReservation(id : string)  {
    return this.http.put<Reservation>(this.base + '/accept/', id);
  }
  refuseReservation(id:string)  {
    return this.http.put<Reservation>(this.base + '/refuse/', id);
  }
  getById(id : string){
    return this.http.get<Reservation>(this.base + '/' + id);
  }

}
