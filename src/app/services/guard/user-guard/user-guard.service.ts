import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    } else if (this.isAdmin(route)) {
      this.router.navigate(['personal/admin']);
      return false;
    }
    return true;
  }

  isAdmin(route: ActivatedRouteSnapshot): boolean {
    const email = route.data.email;
    const token = this.cookieService.get('JWT-TOKEN');
    const tokenPlayload = decode(token);
    return tokenPlayload.sub == email;
  }
}