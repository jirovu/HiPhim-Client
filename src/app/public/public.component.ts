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
  users: Array<string> = new Array<string>();

  constructor(private restApi: RestapiService,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.comments = new Array<Comment>();
    this.data.email.subscribe(email => this.user.email = email);
    var url = this.router.url.substring("/watch".length);
    this.comment.movieId = url.substring(url.indexOf("?id=") + "?id=".length);

    this.restApi.getAllCommentsByMovieId(this.comment.movieId)
      .subscribe(res => {
        this.comments = res;
        res.forEach(comment =>
          this.restApi.getUserByUserId(comment.userId)
            .subscribe(user => {
              this.users.push(user.name);
            }));
      });

    this.restApi.getMovie(url)
      .subscribe(res => { this.movie = res },
        err => { this.router.navigate(['not-found']) });

    this.restApi.getAllMoviesByUserId(url)
      .subscribe(res => this.movies = res,
        err => console.error(err));
  }

  onSelectMovie(movie: Movie) {
    this.comments = new Array<Comment>();
    this.movie = movie;

    this.restApi.getAllCommentsByMovieId(this.movie.id)
      .subscribe(res => {
        this.comments = res;
        res.forEach(comment =>
          this.restApi.getUserByUserId(comment.userId)
            .subscribe(user => {
              this.users.push(user.name);
            }));
      });

    var url = `/${movie.userId}?id=${movie.id}`;
    this.comment.movieId = movie.id;
    this.restApi.getAllMoviesByUserId(url)
      .subscribe(res => this.movies = res,
        err => console.error(err));
  }

  onComment() {
    this.restApi.addComment(this.comment, this.user.email)
      .subscribe(res => {
        this.comment.content = "";
        this.comments = res;
        res.forEach(comment =>
          this.restApi.getUserByUserId(comment.userId)
            .subscribe(user => {
              this.users.push(user.name);
            }));
      },
        err => console.log(err));
  }

}
