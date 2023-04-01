import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postCustomer(data: any){
    return this.http.post<any>("http://localhost:3000/customers", data);
  }

  getCustomer(){
    return this.http.get<any>("http://localhost:3000/customers");
  }

  putCustomer(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/customers/"+id, data);
  }

  deleteCustomer(id: number){
    return this.http.delete<any>("http://localhost:3000/customers/"+id)
  }
}

