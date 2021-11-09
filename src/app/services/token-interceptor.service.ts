import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private dataService: DataService, private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.dataService.getToken()}`
      }
    })
    return next.handle(tokenizeReq).pipe(tap(
      event => {
        if (event instanceof HttpResponse) {
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 ) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            this.router.navigate(['/login']);
          }
        }
      }
    ))
  }
}
