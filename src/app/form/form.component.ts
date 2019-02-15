import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';
import { User } from '../models/User';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  token: string;
  username: string;
  password: string;

  constructor(public restapi: RestapiService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    var user = new User();
    user.username = this.username;
    user.password = this.password;

    this.restapi.getToken(user)
      .subscribe(res => {
        this.token = res;
        localStorage.setItem('token', this.token);
      })
  }

  onHomeSubmit() {
    this.restapi.getData(this.token)
      .subscribe(res => alert(`Data : ${res}`));
  }

}
