import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpService
  ) { }

  // getAllProduct(){
  //   let url = 'https://fakestoreapi.com/products'
  //   return this.http.getRequest(url).pipe(map(response => response));
  // }


  getSingleProduct(id : any){
    let url = `https://fakestoreapi.com/products/${id}`
    return this.http.getRequest(url);
  }

  // getProductCategories(){
  //   let url = 'https://fakestoreapi.com/products/categories';
  //   return this.http.getRequest(url);
  // }

  ProductByCategories(category : any){    
    let url = `https://fakestoreapi.com/products/category/${category}`;
    return this.http.getRequest(url);
    
  }

  getCartItems(){    
    let url = `https://fakestoreapi.com/carts/2`;
    return this.http.getRequest(url);
  }

  getCurrencyPrice(currency : any){
    let url = `https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD&currencies=EUR`
    return this.http.getRequest(url)
  }

  // Node API calls

  getAllProduct(){    
    let url = `http://192.168.1.175:5050/products`;
    return this.http.getRequest(url);
  }

  getHeroPosterDetail(){    
    let url = `http://192.168.1.175:5050/posters`;
    return this.http.getRequest(url);
  }
  
  getCompanyImage(){    
    let url = `http://192.168.1.175:5050/posters/company`;
    return this.http.getRequest(url);
  }

  getProductCategories(){
    let url = 'http://192.168.1.175:5050/categories';
    return this.http.getRequest(url);
  }

  getFeaturedProduct(){
    let url = 'http://192.168.1.175:5050/products/?type=featured';
    return this.http.getRequest(url);
  }
  
}

// getCurrentCurrencyValue(){
//   let currency = forkJoin([
    
//   ])
// }