import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategorieAccessoire } from '../../interfaces/categorie.accessoire';

@Injectable({
  providedIn: 'root'
})
export class CategorieAccessoireService {
  private readonly BASE_URL = environment.BASE;

  constructor(private http: HttpClient) { }

  createCategorieAccessoire(categorieAccessoire: CategorieAccessoire): Observable<CategorieAccessoire> {
    return this.http.post<CategorieAccessoire>(`${this.BASE_URL}/categories`, categorieAccessoire);
  }

  getAllCategories(): Observable<CategorieAccessoire[]> {
    return this.http.get<CategorieAccessoire[]>(`${this.BASE_URL}/categories`);
  }

  getCategorieById(id: string): Observable<CategorieAccessoire> {
    return this.http.get<CategorieAccessoire>(`${this.BASE_URL}/categories/${id}`);
  }

  updateCategorieAccessoire(id: string, categorieAccessoire: CategorieAccessoire): Observable<CategorieAccessoire> {
    return this.http.put<CategorieAccessoire>(`${this.BASE_URL}/categories/${id}`, categorieAccessoire);
  }

  deleteCategorieAccessoire(id: string): Observable<CategorieAccessoire> {
    return this.http.delete<CategorieAccessoire>(`${this.BASE_URL}/categories/${id}`);
  }
}
