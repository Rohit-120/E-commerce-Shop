import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { USER_LOGIN, USER_LOGOUT, USER_REGISTRATION } from '../constants/apiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor( 
    private http : HttpService,

  ) { }

  userRegistration(body : any): Observable<any> {
    return this.http.postRequest(USER_REGISTRATION , body);
  }
  
  userLogin(body : any): Observable<any> {
    return this.http.postRequest(USER_LOGIN , body);
  }
  
  userLogout(): Observable<any> {
    return this.http.getRequest(USER_LOGOUT);
  }
}
