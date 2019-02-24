import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../services/restapi/restapi.service';
import { DataService } from '../services/data/data.service';

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

  constructor(private route: ActivatedRoute,
    private restApi: RestapiService,
    private dataService: DataService) { }

  ngOnInit() {
    this.restApi.getAllMovies()
      .subscribe(res => {
        this.slideMovies = res.slice(0, 3);
        this.leftMoviesList = res.slice(3, 6);
        this.movies = res;
      });
  }
}
