import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        request = request.clone();
        if (error.status === 401 || error.status === 403) {
          this.zone.run(() => {
            this.snackBar
              .open('Your session has expired!', 'Close')
              .afterDismissed()
              .subscribe(() => {
                this.authService.logOut();
                this.router.navigate(['/auth/login']);
              });
          });
        }
        return throwError(error);
      })
    );
  }
}

