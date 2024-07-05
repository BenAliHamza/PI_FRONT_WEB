import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../../interfaces/categories.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private base = environment.BASE + "/categories";
  constructor(private  http: HttpClient) { }


  getCategories():Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.base);
  }
  createCategory(cat : ICategory) {
    return this.http.post<ICategory>(this.base , cat);
  }

  updateCategory(updatedCategory: ICategory) {
    return this.http.patch<ICategory>(this.base +'/'+ updatedCategory._id, updatedCategory);
  }

  delete(_id: string) {
    return this.http.delete<ICategory>(this.base +'/'+ _id);
  }
}
