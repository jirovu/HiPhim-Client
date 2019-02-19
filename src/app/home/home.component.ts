import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../services/restapi/restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<Movie>

  constructor(private route: ActivatedRoute,
    private restApi: RestapiService) { }

  ngOnInit() {
    this.restApi.getAllMovies()
      .subscribe(res => this.movies = res);
  }

}
