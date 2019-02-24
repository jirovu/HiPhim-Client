import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<Movie> = [];
  slideMovies: Array<Movie> = [];
  firstMovie: Movie;
  leftMoviesList: Array<Movie> = [];

  constructor(private restApi: RestapiService) { }

  ngOnInit() {
    this.restApi.getAllMovies()
      .subscribe(res => {
        this.slideMovies = res.slice(0, 3);
        this.leftMoviesList = res.slice(3, 6);
        this.movies = res;
      });
  }
}
