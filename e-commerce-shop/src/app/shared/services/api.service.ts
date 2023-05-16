import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpService
  ) { }

  getAllProduct(){
    let url = 'https://fakestoreapi.com/products?limit=8'
    return this.http.getRequest(url);
  }


  getSingleProduct(id : any){
    let url = `https://fakestoreapi.com/products/${id}`
    return this.http.getRequest(url);
  }

  

}
