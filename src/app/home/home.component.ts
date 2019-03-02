import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { HomeServiceService } from '../services/restapi/homeService/home-service.service';

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

  constructor(private homeService: HomeServiceService) { }

  async ngOnInit() {
    this.movies = await this.homeService.getLimit8Movies();
    this.slideMovies = this.movies.slice(0, 3);
    this.leftMoviesList = this.movies.slice(3, 6);
  }
}
