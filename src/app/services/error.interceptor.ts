import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest , HttpHandler , HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private service: UserService, public router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent <any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.service.logout();
                this.router.navigate(["/login"])
            }
            if (err.status === 409) {
                alert('Invalid Username / Password');
            }
            const error = err.error.mesaage || err.statusText;
            return throwError(error);
        }));
    }
}
