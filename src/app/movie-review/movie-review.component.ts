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

  constructor(private restApi: RestapiService,
    private router: Router) { }

  ngOnInit() {
    this.movie.category = 'all';
    this.restApi.getAllMovies()
      .subscribe(res => {
        this.movies = res
      });
  }

  onSelect(event: any) {
    this.movie.category = event.source.value;
    if (this.movie.category === 'all') {
      this.restApi.getAllMovies()
        .subscribe(res => {
          this.movies = res
        });
    } else {
      this.restApi.getMoviesByCategory(this.movie.category)
        .subscribe(res => this.movies = res);
    }
  }

  onSearch() {
    if (this.movie.category == 'all') {
      this.restApi.getMoviesByName(this.movie)
        .subscribe(res => {
          this.movies = res;
          this.movie.name = null;
        });
    } else {
      this.restApi.getMoviesByCategoryAndName(this.movie)
        .subscribe(res => {
          this.movies = res;
          this.movie.name = null;
        });
    }
  }

}
