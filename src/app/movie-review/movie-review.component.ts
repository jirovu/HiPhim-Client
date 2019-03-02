import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { HomeServiceService } from '../services/restapi/homeService/home-service.service';

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

  constructor(private homeService: HomeServiceService) { }

  async ngOnInit() {
    this.movie.category = 'all';
    this.movies = await this.homeService.getAllMovies();
  }

  async onSelect(event: any) {
    this.movie.category = event.source.value;
    if (this.movie.category === 'all') {
      this.movies = await this.homeService.getAllMovies();
    } else {
      this.movies = await this.homeService.getMoviesByCategory(this.movie.category);
    }
  }

  async onSearch() {
    if (this.movie.category == 'all') {
      this.movies = await this.homeService.getMoviesByName(this.movie);
      this.movie.name = null;
    } else {
      this.movies = await this.homeService.getMoviesByCategoryAndName(this.movie);
      this.movie.name = null;
    }
  }

}
