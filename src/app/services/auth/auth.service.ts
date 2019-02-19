import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private cookieService: CookieService) { }

  public isAuthenticated(): boolean {
    const token = this.cookieService.get('JWT-TOKEN');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getEmailFromToken(): string {
    const token = this.cookieService.get('JWT-TOKEN');
    const tokenPlayload = this.jwtHelper.decodeToken(token);
    return tokenPlayload.sub;
  }
}
