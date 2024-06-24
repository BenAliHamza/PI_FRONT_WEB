import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Accessoire } from '../../interfaces/accessoire';

@Injectable({
  providedIn: 'root'
})
export class AccessoireService {
  private readonly BASE_URL = environment.BASE;

  constructor(private http: HttpClient) { }

  createAccessoire(accessoire: Accessoire): Observable<Accessoire> {
    return this.http.post<Accessoire>(`${this.BASE_URL}/accessoires`, accessoire);
  }

  getAllAccessoires(): Observable<Accessoire[]> {
    return this.http.get<Accessoire[]>(`${this.BASE_URL}/accessoires`);
  }

  getAccessoireById(id: string): Observable<Accessoire> {
    return this.http.get<Accessoire>(`${this.BASE_URL}/accessoires/${id}`);
  }

  updateAccessoire(id: string, accessoire: Accessoire): Observable<Accessoire> {
    return this.http.patch<Accessoire>(`${this.BASE_URL}/accessoires/${id}`, accessoire);
  }

  deleteAccessoire(id: string): Observable<Accessoire> {
    return this.http.delete<Accessoire>(`${this.BASE_URL}/accessoires/${id}`);
  }
}
