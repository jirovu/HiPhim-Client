import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../services/data/data.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;
  user = new User();
  isLoginValid: boolean = false;
  status: number;
  role: string;

  constructor(public restapi: RestapiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private dataService: DataService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  async onLoginSubmit() {
    try {
      this.cookieService.deleteAll();
      await this.restapi.login(this.user);
      this.dataService.shareEmail(this.authService.getEmailFromToken());
      this.router.navigate(['personal/user'])
      this.snackBar.open('Login successfully', 'Ok', {
        duration: 3000,
      });
    } catch (error) {
      this.status = error.status;
      this.snackBar.open(`Failed login ${this.status}`, 'Ok', {
        duration: 3000,
      });
    }
  }

}
