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

  async ngOnInit() {
    this.movies = await this.restApi.getAllMovies();
    this.slideMovies = this.movies.slice(0, 3);
    this.leftMoviesList = this.movies.slice(3, 6);
  }
}
