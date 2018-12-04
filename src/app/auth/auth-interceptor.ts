import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', // Set() does not overrides all headers, it only adds a new header/overwrites if it exists
      'Bearer ' + authToken) // 'Bearer ' is a convention, not obligatory
    });
    return next.handle(authRequest);
  }
}
