import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
    private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    
    const email = route.data.email;
    const token = this.cookieService.get('JWT-TOKEN');
    const tokenPlayload = decode(token);
    if (this.auth.isAuthenticated() && tokenPlayload.sub == email) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
