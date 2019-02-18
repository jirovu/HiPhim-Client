import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';

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
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.restapi.login(this.user)
      .subscribe(res => {
        this.router.navigate(['admin-page'])
        this.snackBar.open('Login successfully', 'Ok', {
          duration: 3000,
        });
      },
        err => {
          this.status = err.status;
          this.snackBar.open(`Failed login ${this.status}`, 'Ok', {
            duration: 2000,
          });
        });
  }

  onHomeSubmit() {
    this.restapi.getData()
      .subscribe(res => alert(`Data : ${res}`));
  }

}
