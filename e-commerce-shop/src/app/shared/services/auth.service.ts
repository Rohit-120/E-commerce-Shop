import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {
  TOKEN_GENERATION,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
} from '../constants/apiEndPoint';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) {}

  userRegistration(body: any): Observable<any> {
    return this.http.postRequest(USER_REGISTRATION, body);
  }

  userLogin(body: any): Observable<any> {
    return this.http.postRequest(USER_LOGIN, body);
  }

  userLogout(): Observable<any> {
    return this.http.getRequest(USER_LOGOUT);
  }

  decodeToken(): Observable<any> {
    let token: any = localStorage.getItem('token');
    return jwtDecode(token);
  }

  isAuthTokenValid(): void {
    const tokenData: any = this.decodeToken();
    let minute = 0;
    tokenData
      ? (minute = this.getMinutes(new Date(tokenData?.exp * 1000), new Date()))
      : '';
    if (minute < 10) {
      this.reGenerateToken();
    }
  }

  getMinutes(d1: any, d2: any) {
    const mins = Math.floor(Math.abs(d1 - d2) / 60000);
    return mins;
  }

  reGenerateToken(): void {
    this.http.postRequest(TOKEN_GENERATION, null).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      // this.setAuthToken(res.token)
    });
  }
}
