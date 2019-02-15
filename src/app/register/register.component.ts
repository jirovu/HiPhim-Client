import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RestapiService } from '../services/restapi/restapi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();

  constructor(private restapi: RestapiService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.restapi.registerUser(this.user)
      .subscribe(res => alert(res));
  }

}
