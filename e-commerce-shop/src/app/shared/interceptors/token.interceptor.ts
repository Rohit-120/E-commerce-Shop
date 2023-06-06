import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private storageService : StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let authHeader = this.storageService.get('token');
     
     if (authHeader) {
      request = request.clone({
        headers : request.headers.set('token', authHeader)
      })
    }
    return next.handle(request);
  }
}
