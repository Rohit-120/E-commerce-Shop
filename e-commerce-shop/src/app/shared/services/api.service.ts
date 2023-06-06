import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ADD_TO_CART, ADD_TO_FAVORITE, ADVERTISEMENTS, ALL_PRODUCTS, CART_PRODUCTS, FILTERS, REMOVE_CART, REMOVE_FAVORITE, SIGNUP_FOOTER, USER_LOGIN, USER_LOGOUT, USER_REGISTRATION, VENDORS } from '../constants/apiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpService
  ) { }


  
  
  // Node API calls
  
  getAllProduct(body?:any): Observable<any> {   
    console.log('POST BODY =====> ', body);
    return this.http.postRequest(ALL_PRODUCTS, body);
  }
  
  getSingleProduct(id:any): Observable<any> {   
    return this.http.postRequest(ALL_PRODUCTS+"/"+id);
  }
  
  getHeroPosterDetail(): Observable<any> {    
    return this.http.getRequest(ADVERTISEMENTS);
  }
  
  getCompanyImage(): Observable<any> {    
    return this.http.getRequest(VENDORS);
  }
  
  getTotalCategories(body:any): Observable<any> {
    return this.http.postRequest(ALL_PRODUCTS, body);
  }
  
  getProductFilterList(): Observable<any> {
    return this.http.getRequest(FILTERS);
  }

  getCartProducts(): Observable<any> {    
    return this.http.getRequest(CART_PRODUCTS);
  }

  addToCart(body:any): Observable<any> {
    return this.http.postRequest(ADD_TO_CART, body);
  }

  removeCartProduct(_id:any): Observable<any> {
    return this.http.deleteRequest(REMOVE_CART, _id)    
  }

  addToFavorite(body:any): Observable<any> {
    return this.http.postRequest(ADD_TO_FAVORITE, body);
  }


  removeFavoriteProduct(_id:any): Observable<any> {
    return this.http.deleteRequest(REMOVE_FAVORITE, _id)    
  }
  
  //Footer email Signup api
  emailSignUp(body : any): Observable<any> {
    return this.http.postRequest(SIGNUP_FOOTER, body);
  }
}
