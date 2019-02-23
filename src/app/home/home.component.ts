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
        this.firstMovie = res[Math.floor(Math.random() * res.length)];
        this.slideMovies = this.forHandler(res, 1);
        this.leftMoviesList = this.forHandler(res, 2);
        this.movies = this.forHandler(res, 7);
      });
  }

  forHandler(arr: Array<Movie>, endIndex: number): Array<Movie> {
    let result: Array<Movie> = [];
    for (let index = 0; index < arr.length; index++) {
      if (index <= endIndex) {
        result.push(arr[index]);
      }
    }
    return result;
  }
}
