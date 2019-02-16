import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;
  user = new User();

  constructor(public restapi: RestapiService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.restapi.getToken(this.user)
      .subscribe(res => {
        console.log(res);
      })
  }

  onHomeSubmit() {
    this.restapi.getData()
      .subscribe(res => alert(`Data : ${res}`));
  }

}
