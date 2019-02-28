import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  movie: Movie;
  movies: Array<Movie>;

  constructor(private restApi: RestapiService,
    private router: Router) { }

  ngOnInit() {
    var url = this.router.url.substring("/watch".length);
    this.restApi.getMovie(url)
      .subscribe(res => { this.movie = res },
        err => { this.router.navigate(['not-found']) });

    this.restApi.getAllMoviesByUserId(url)
      .subscribe(res => this.movies = res,
        err => console.error(err));
  }

}
