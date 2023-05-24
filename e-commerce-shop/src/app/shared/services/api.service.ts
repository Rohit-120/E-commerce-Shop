import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpService
  ) { }

  getAllProduct(){
    let url = 'https://fakestoreapi.com/products'
    return this.http.getRequest(url).pipe(map(response => response));
  }


  getSingleProduct(id : any){
    let url = `https://fakestoreapi.com/products/${id}`
    return this.http.getRequest(url);
  }

  getProductCategories(){
    let url = 'https://fakestoreapi.com/products/categories';
    return this.http.getRequest(url);
  }

  ProductByCategories(category : any){    
    let url = `https://fakestoreapi.com/products/category/${category}`;
    return this.http.getRequest(url);
    
  }

  getCartItems(){    
    let url = `https://fakestoreapi.com/carts/2`;
    return this.http.getRequest(url);
  }

}
