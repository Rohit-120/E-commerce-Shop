import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, map } from 'rxjs';

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


  getSingleProduct(id : any): Observable<any> {
    let url = `https://fakestoreapi.com/products/${id}`
    return this.http.getRequest(url);
  }

  // getProductCategories(){
  //   let url = 'https://fakestoreapi.com/products/categories';
  //   return this.http.getRequest(url);
  // }

  // ProductByCategories(category : any): Observable<any> {    
  //   let url = `https://fakestoreapi.com/products/category/${category}`;
  //   return this.http.getRequest(url);
    
  // }

  getCartItems(): Observable<any> {    
    let url = `https://fakestoreapi.com/carts/2`;
    return this.http.getRequest(url);
  }

  // getCurrencyPrice(currency : any): Observable<any> {
  //   let url = `https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD&currencies=EUR`
  //   return this.http.getRequest(url)
  // }

  // Node API calls

  getAllProduct(body?:any): Observable<any> {    
    let url = `http://192.168.1.178:1108/products`;
    return this.http.postRequest(url, body);
  }

  getHeroPosterDetail(): Observable<any> {    
    let url = `http://192.168.1.178:1108/poster`;
    return this.http.getRequest(url);
  }
  
  getCompanyImage(): Observable<any> {    
    let url = `http://192.168.1.178:1108/vendors`;
    return this.http.getRequest(url);
  }

  getProductCategories(): Observable<any> {
    let url = 'http://192.168.1.178:1108/products/categories';
    return this.http.getRequest(url);
  }

  getProductSpecificCategories(category : any): Observable<any> {
    let url = `http://192.168.1.178:1108/products/categories/${category}`;
    return this.http.getRequest(url);
  }

  getFeaturedProduct(): Observable<any> {
    let url = 'http://192.168.1.178:1108/products?isFeatured=true';
    return this.http.postRequest(url, {isFeatured: true});
  }
  
  getProductPerPage(body : any): Observable<any> {
    let url = `http://192.168.1.178:1108/products`;
    return this.http.postRequest(url, body);
  }
}
