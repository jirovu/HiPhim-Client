import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  movies: Array<Movie>

  constructor(private route: ActivatedRoute,
    private restApi: RestapiService) { }

  ngOnInit() {
    this.restApi.getAllMovies()
      .subscribe(res => this.movies = res);
  }

}
