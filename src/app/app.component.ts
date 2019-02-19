import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HiPhim';

  constructor(private authService: AuthService,
    private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.shareEmail(this.authService.getEmailFromToken());
  }
}
