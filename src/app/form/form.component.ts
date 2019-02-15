import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi/restapi.service';


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
    this.restapi.getToken({ "username": this.username, "password": this.password })
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
