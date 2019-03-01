import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();

  constructor(private restapi: RestapiService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      await this.restapi.registerUser(this.user);
      this.router.navigate(['login']);
      this.snackBar.open('Register successfully', 'Ok', {
        duration: 3000,
      });
    } catch (error) {
      this.router.navigate(['register']);
      this.snackBar.open('Email already exist', 'Ok', {
        duration: 3000,
      });
    }
  }
}
