import { Component, OnInit } from '@angular/core';
import { Supervisor } from '../models/Supervisor';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  supervisor = new Supervisor();
  user = new User();
  isValidEmail: boolean = false;
  isValidCode: boolean = false;
  replacePassword: string;
  isLoad: boolean = false;

  constructor(private restService: RestapiService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async onIdentifyEmail() {
    try {
      this.isLoad = true;
      this.isValidEmail = await this.restService.identifyEmail(this.supervisor);
    } catch (error) {
      this.isLoad = false;
      this.snackBar.open('Email not found', 'Ok', {
        duration: 3000,
      });
    }
  }

  async onIdentifyCode() {
    try {
      this.isValidCode = await this.restService.identifyCode(this.supervisor);
    } catch (error) {
      this.snackBar.open('Invalid Identify Code', 'Ok', {
        duration: 3000,
      })
    }
  }

  async changePassword() {
    try {
      await this.restService.changePassword(this.user.password, this.supervisor.identifyCode);
      this.router.navigate(['login'])
      this.snackBar.open('Change password successfully', 'Ok', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Changing password failed', 'Ok', {
        duration: 3000,
      });
    }
  }

}
