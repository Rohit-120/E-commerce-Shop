import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.storageService.get('token');
    
  
    if (token && !request.url.includes('generate-token')) {
      this.authService.isAuthTokenValid() 
    }

    if (token) {
      request = request.clone({
        headers: request.headers.set('token', token),
      });
    }
      
    return next.handle(request);
  }
}
