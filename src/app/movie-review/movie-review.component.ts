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

  constructor(private restApi: RestapiService,
    private router: Router) { }

  ngOnInit() {
    this.restApi.getAllMovies()
      .subscribe(res => {
        this.movies = res
      });
  }

  onSelect(event: any) {
    if (event.source.value === 'all') {
      this.restApi.getAllMovies()
        .subscribe(res => {
          this.movies = res
        });
    } else {
      this.restApi.getMoviesByCategory(event.source.value)
        .subscribe(res => this.movies = res);
    }
  }

}
