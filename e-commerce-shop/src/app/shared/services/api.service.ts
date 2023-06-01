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
    console.log('POST BODY =====> ', body);
     
    let url = `http://192.168.1.178:1108/products`;
    return this.http.postRequest(url, body);
  }

  getHeroPosterDetail(): Observable<any> {    
    let url = `http://192.168.1.178:1108/advertisements`;
    return this.http.getRequest(url);
  }

  getCompanyImage(): Observable<any> {    
    let url = `http://192.168.1.178:1108/vendors`;
    return this.http.getRequest(url);
  }

  getTotalCategories(body:any): Observable<any> {
    let url = 'http://192.168.1.178:1108/products';
    return this.http.postRequest(url, body);
  }

  getProductsByCategories(category : any): Observable<any> {
    let url = `http://192.168.1.178:1108/products/categories/${category}`;
    return this.http.getRequest(url);
  }

  getProductFilterList(): Observable<any> {
    let url = 'http://192.168.1.178:1108/products/filters';
    return this.http.getRequest(url);
  }

  //Footer email Signup api

  emailSignUp(body : any): Observable<any> {
    let url = 'http://192.168.1.178:1108/signup';
    return this.http.postRequest(url, body);
  }

}
