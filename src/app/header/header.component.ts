import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data/data.service';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;

  constructor(private dataService: DataService,
    private apiService: RestapiService,
    private router: Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.dataService.email.subscribe(email => this.email = email);
  }

  onLogout() {
    this.apiService.logout()
      .subscribe(res => {
        this.dataService.shareEmail(null);
        this.router.navigate(['home']);
        this.snackBar.open(`Logout successfully`, 'Ok', {
          duration: 3000,
        });
      });
  }
}
