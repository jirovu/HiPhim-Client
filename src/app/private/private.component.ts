import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { Comment } from '../models/Comment';
import { AdminService } from '../services/restapi/adminService/admin.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  user: User = new User();
  movie: Movie = new Movie();

  constructor(private adminService: AdminService,
    private router: Router,
    private data: DataService) { }

  async ngOnInit() {
    this.data.email.subscribe(email => this.user.email = email);
    if (this.user.email != 'admin@hiphim.com') {
      this.router.navigate(['not-found']);
    }
    var url = this.router.url.substring("/private".length);
    try {
      await this.adminService.getMovie(url).then(res => this.movie = res);
    } catch (e) {
      this.router.navigate(['not-found']);
    }
  }

}
