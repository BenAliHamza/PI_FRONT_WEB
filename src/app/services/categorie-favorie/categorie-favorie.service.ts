import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategorieFavorie } from '../../interfaces/categorie-favorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieFavorieService {
  private readonly BASE_URL = environment.BASE;

  constructor(private http: HttpClient) { }

  createCategorieFavorie(categorieFavorie: CategorieFavorie): Observable<CategorieFavorie> {
    return this.http.post<CategorieFavorie>(`${this.BASE_URL}/categorieFavorie`, categorieFavorie);
  }

  getAllCategorieFavoriesUser(): Observable<CategorieFavorie[]> {
    return this.http.get<CategorieFavorie[]>(`${this.BASE_URL}/categorieFavorie`);
  }

  getAllCategorieFavoriesAdmin(): Observable<CategorieFavorie[]> {
    return this.http.get<CategorieFavorie[]>(`${this.BASE_URL}/categorieFavorie/admin`);
  }

  getCategorieFavorieById(id: string): Observable<CategorieFavorie> {
    return this.http.get<CategorieFavorie>(`${this.BASE_URL}/categorieFavorie/${id}`);
  }

  updateCategorieFavorieById(id: string, categorieFavorie: CategorieFavorie): Observable<CategorieFavorie> {
    return this.http.put<CategorieFavorie>(`${this.BASE_URL}/categorieFavorie/${id}`, categorieFavorie);
  }

  deleteCategorieFavorieById(id: string): Observable<CategorieFavorie> {
    return this.http.delete<CategorieFavorie>(`${this.BASE_URL}/categorieFavorie/${id}`);
  }

  deleteCategorieFavoriesByUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/categorieFavorie/user/${userId}`);
  }
}
