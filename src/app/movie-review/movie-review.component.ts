import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  categogries: string[] = [
    'All',
    'Action',
    'Romantic',
    'Cartoon',
    'Comedy'
  ];
  movies: Array<Movie>;
  p: number = 1;
  movie: Movie = new Movie();

  constructor(private restApi: RestapiService) { }

  async ngOnInit() {
    this.movie.category = 'all';
    this.movies = await this.restApi.getAllMovies();
  }

  async onSelect(event: any) {
    this.movie.category = event.source.value;
    if (this.movie.category === 'all') {
      this.movies = await this.restApi.getAllMovies();
    } else {
      this.movies = await this.restApi.getMoviesByCategory(this.movie.category);
    }
  }

  async onSearch() {
    if (this.movie.category == 'all') {
      this.movies = await this.restApi.getMoviesByName(this.movie);
      this.movie.name = null;
    } else {
      this.movies = await this.restApi.getMoviesByCategoryAndName(this.movie);
      this.movie.name = null;
    }
  }

}
