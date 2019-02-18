import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();

  constructor(private restapi: RestapiService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.restapi.registerUser(this.user)
      .subscribe(res => this.router.navigate(['login']));
  }

}
