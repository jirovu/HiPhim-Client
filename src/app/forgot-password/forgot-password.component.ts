import { Component, OnInit } from '@angular/core';
import { Supervisor } from '../models/Supervisor';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';
import { Router } from '@angular/router';


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

  constructor(private restService: RestapiService,
    private router: Router) { }

  ngOnInit() {
  }

  onIdentifyEmail() {
    this.restService.identifyEmail(this.supervisor)
      .subscribe(res => this.isValidEmail = res);
  }

  onIdentifyCode() {
    this.restService.identifyCode(this.supervisor)
      .subscribe(res => this.isValidCode = res);
  }

  changePassword() {
    return this.restService.changePassword(this.user.password, this.supervisor.identifyCode)
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.router.navigate(['login'])
        } else {
          alert('Password failed to change');
        }
      });
  }

}
