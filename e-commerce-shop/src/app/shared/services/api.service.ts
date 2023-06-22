import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import {
  ADDRESS_LIST,
  ADD_ADDRESS,
  ADD_REVIEW,
  ADD_TO_CART,
  ADD_TO_FAVORITE,
  ADVERTISEMENTS,
  ALL_PRODUCTS,
  CART_PRODUCTS,
  FAVORITE_PRODUCTS,
  FILTERS,
  ORDER_LIST,
  PLACED_ORDER_DETAILS,
  PLACE_ORDER,
  REMOVE_ADDRESS,
  REMOVE_CART,
  REMOVE_FAVORITE,
  SIGNUP_FOOTER,
  UPDATE_ADDRESS,
  VENDORS,
} from '../constants/apiEndPoint';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpService,
    private httpC: HttpClient
    
    
    ) {}

  // Node API calls

  getAllProduct(body?: any): Observable<any> {
    console.log('POST BODY =====> ', body);
    return this.http.postRequest(ALL_PRODUCTS, body);
  }

  trySomething(): Observable<any> {
    return this.httpC.get('')
  }
  
  getSingleProduct(id: any): Observable<any> {
    console.log(ALL_PRODUCTS + '/' + id, 'Single Product APIService');

    return this.http.postRequest(ALL_PRODUCTS + '/' + id);
  }

  getHeroPosterDetail(): Observable<any> {
    return this.http.getRequest(ADVERTISEMENTS);
  }

  getCompanyImage(): Observable<any> {
    return this.http.getRequest(VENDORS);
  }

  getTotalCategories(body: any): Observable<any> {
    return this.http.postRequest(ALL_PRODUCTS, body);
  }

  getProductFilterList(): Observable<any> {
    return this.http.getRequest(FILTERS);
  }

  getCartProducts(): Observable<any> {
    return this.http.getRequest(CART_PRODUCTS);
  }

  addToCart(body: any): Observable<any> {
    return this.http.postRequest(ADD_TO_CART, body);
  }

  removeCartProduct(_id: any): Observable<any> {
    console.log(_id);

    return this.http.deleteRequest(REMOVE_CART + '/' + _id);
  }

  getFavoriteProduct(): Observable<any> {
    return this.http.getRequest(FAVORITE_PRODUCTS);
  }

  addToFavorite(id: any): Observable<any> {
    return this.http.getRequest(ADD_TO_FAVORITE + '/' + id);
  }

  removeFavoriteProduct(_id: any): Observable<any> {
    console.log(_id, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');

    return this.http.deleteRequest(REMOVE_FAVORITE + '/' + _id);
  }

  changeCartQuantity(body: any): Observable<any> {
    return this.http.postRequest(ADD_TO_CART, body);
  }

  addReview(body: any): Observable<any> {
    return this.http.postRequest(ADD_REVIEW, body);
  }

  //api for user Addresses
  addAddress(body: any): Observable<any> {
    return this.http.postRequest(ADD_ADDRESS, body);
  }

  getAddressList(): Observable<any> {
    return this.http.getRequest(ADDRESS_LIST);
  }

  removeAddress(addressId: string): Observable<any> {
    return this.http.deleteRequest(REMOVE_ADDRESS + '/' + addressId);
  }

  updateAddress(addressId: string, body: any): Observable<any> {
    return this.http.putRequest(UPDATE_ADDRESS + '/' + addressId, body);
  }

  //API for Orders
  placeOrder(body: any): Observable<any> {
    return this.http.postRequest(PLACE_ORDER, body);
  }

  orderList(): Observable<any> {
    return this.http.getRequest(ORDER_LIST);
  }

  orderDetails(id: any): Observable<any> {
    return this.http.getRequest(PLACED_ORDER_DETAILS + '/' + id);
  }

  //Footer email Signup api
  emailSignUp(body: any): Observable<any> {
    return this.http.postRequest(SIGNUP_FOOTER, body);
  }
}
