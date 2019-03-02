import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthServiceService } from '../services/restapi/authService/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;

  constructor(private dataService: DataService,
    private authServiceService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.email.subscribe(email => this.email = email);
  }

  async onLogout() {
    await this.authServiceService.logout();
    this.dataService.shareEmail(null);
    this.router.navigate(['home']);
    this.snackBar.open(`Logout successfully`, 'Ok', {
      duration: 3000,
    });
  }
}
