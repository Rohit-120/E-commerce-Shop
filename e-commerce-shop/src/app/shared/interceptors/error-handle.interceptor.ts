import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('error interceptor');
    
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.log('Error Occurred: ' + error.error.message);
        }else{
          console.log('Server Error : ', error.error.message);
        }
        return throwError(()=>{
          new Error(error.error)
          console.log(error, 'interceptor error ?????????');
          
        })
      })
      )
  }
}
