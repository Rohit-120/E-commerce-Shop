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
    return next.handle(request).pipe(
      catchError((error : any) => {
        if (error instanceof ErrorEvent) {
          console.log('Error Occurred: ' + error.error.message);
        }else{
          console.log('Server Error : ', error.error.message);
        }
        return throwError(()=>{
          new Error(error)
          console.log(error, 'interceptor error ?????????');
          
        })
      })
      )
  }
}
