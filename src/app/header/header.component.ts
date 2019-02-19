import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;

  constructor(private auth: AuthService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.email = data);
  }

}
