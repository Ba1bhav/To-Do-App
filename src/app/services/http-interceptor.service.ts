import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone()).pipe(catchError((error:any)=>{
      if(error instanceof HttpErrorResponse && error.status===401){
        localStorage.removeItem('token')
        console.log('Token Refreshed',error,error.status,request)
      }
      return throwError(error) ;
    }))
  }
}
