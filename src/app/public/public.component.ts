import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data/data.service';
import { User } from '../models/User';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  user: User = new User();
  movie: Movie = new Movie();
  comment: Comment = new Comment();
  movies: Array<Movie>;
  comments: Array<Comment>;

  constructor(private restApi: RestapiService,
    private router: Router,
    private data: DataService) { }

  async ngOnInit() {
    var url = this.router.url.substring("/watch".length);
    this.data.email.subscribe(email => this.user.email = email);
    this.comment.movieId = url.substring(url.indexOf("?id=") + "?id=".length);
    this.comments = await this.restApi.getAllCommentsByMovieId(this.comment.movieId);
    this.movies = await this.restApi.getAllMoviesByUserId(url);
    try {
      await this.restApi.getMovie(url).then(res => this.movie = res);
    } catch (e) {
      this.router.navigate(['not-found']);
    }
  }

  async onSelectMovie(movie: Movie) {
    this.movie = movie;
    this.comments = await this.restApi.getAllCommentsByMovieId(this.movie.id);

    var url = `/${movie.userId}?id=${movie.id}`;
    this.comment.movieId = movie.id;
    this.movies = await this.restApi.getAllMoviesByUserId(url);
  }

  async onComment() {
    this.comments = await this.restApi.addComment(this.comment, this.user.email);
    this.comment.content = "";
  }

}
