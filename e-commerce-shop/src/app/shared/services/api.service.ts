import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ADVERTISEMENTS, ALL_PRODUCTS, FILTERS, SIGNUP_FOOTER, VENDORS } from '../constants/apiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpService
  ) { }


  getCartItems(): Observable<any> {    
    let url = `https://fakestoreapi.com/carts/2`;
    return this.http.getRequest(url);
  }


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

  //Footer email Signup api
  emailSignUp(body : any): Observable<any> {
    return this.http.postRequest(SIGNUP_FOOTER, body);
  }
}
