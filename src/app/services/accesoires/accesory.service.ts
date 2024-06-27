import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccesoryService {
  private base = environment.BASE + "/accessoires";
  constructor(private  http: HttpClient) { }

  createAccesory(formData: FormData) {
    return this.http.post(this.base, formData);
  }

  getAccById(id: string) {
    return this.http.get(this.base + "/" + id);
  }

  delete(id :string) {
    return this.http.delete(this.base + "/" + id);
  }

  update(_id: string, product :any) {
    return this.http.patch(this.base + "/" + _id, product );
  }

  getll() {
    return this.http.get(this.base);
  }
}
