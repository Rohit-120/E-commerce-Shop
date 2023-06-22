import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  TOKEN_GENERATION,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
} from '../constants/apiEndPoint';
import jwtDecode from 'jwt-decode';

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

  //API for reset password

  forgotPassword(body: any): Observable<any> {
    return this.http.postRequest(FORGOT_PASSWORD, body);
  }

  resetPassword(body: any): Observable<any> {
    return this.http.postRequest(RESET_PASSWORD, body);
  }

  decodeToken(): Observable<any> {
    let token: any = localStorage.getItem('token');
    return jwtDecode(token);
  }

  isAuthTokenValid(): void {
    const tokenData: any = this.decodeToken();
    let currentTime = Math.floor(new Date().getTime() / 1000);

    if (currentTime > tokenData.exp) {
      this.reGenerateToken();
    }
  }

  reGenerateToken(): void {
    this.http.postRequest(TOKEN_GENERATION, null).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
    });
  }
}
