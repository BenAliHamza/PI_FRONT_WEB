import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private base = environment.BASE + "/reponses/";

  constructor(private http: HttpClient) { }

  createReponse(reponse: any): Observable<any> {
    return this.http.post(this.base, reponse);
  }

  deleteReponse(id: string): Observable<any> {
    return this.http.delete(`${this.base}${id}`);
  }

  getReponses(): Observable<any> {
    return this.http.get(this.base);
  }

  getReponse(id: string): Observable<any> {
    return this.http.get(`${this.base}${id}`);
  }

  updateReponse(id: string, reponse: any): Observable<any> {
    return this.http.put(`${this.base}${id}`, reponse);
  }
  getReponseByReclamationId(reclamationId: string): Observable<any> {
    return this.http.get(`${this.base}reclamation/${reclamationId}`);
  }
}
