import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { Router, NavigationStart } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { DataService } from '../services/data/data.service';
import { User } from '../models/User';
import { filter } from "rxjs/operators";
import { Comment } from '../models/Comment';
import { HomeServiceService } from '../services/restapi/homeService/home-service.service';
import { UserServiceService } from '../services/restapi/userService/user-service.service';
import { AuthService } from '../services/auth/auth.service';

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
  isLogedin: boolean;

  constructor(private homeService: HomeServiceService,
    private userService: UserServiceService,
    private router: Router,
    private data: DataService,
    private autService: AuthService) {
    router.events
      .pipe(
        filter(
          (event: NavigationEvent) => {
            return (event instanceof NavigationStart);
          }
        )
      )
      .subscribe(
        (event: NavigationStart) => {
          if (event.url.startsWith('/watch')) {
            let url = event.url.substring("/watch".length);
            this.handleUrl(url);
          }
        }
      );
  }

  async ngOnInit() {
    this.isLogedin = this.autService.isAuthenticated();
    let url = this.router.url.substring("/watch".length);
    await this.handleUrl(url);
  }

  private async handleUrl(url: string) {
    this.data.email.subscribe(email => this.user.email = email);
    this.comment.movieId = url.substring(url.indexOf("?id=") + "?id=".length);
    try {
      await this.homeService.getMovie(url).then(res => this.movie = res);
      this.comments = await this.homeService.getAllCommentsByMovieId(this.comment.movieId);
      this.movies = await this.homeService.getAllMoviesByUserId(url);
    } catch (e) {
      this.router.navigate(['not-found']);
    }
  }

  async onSelectMovie(movie: Movie) {
    this.movie = movie;
    this.comments = await this.homeService.getAllCommentsByMovieId(this.movie.id);

    let url = `/${movie.userId}?id=${movie.id}`;
    this.comment.movieId = movie.id;
    this.movies = await this.homeService.getAllMoviesByUserId(url);
  }

  async onComment() {
    this.comments = await this.userService.addComment(this.comment, this.user.email);
    this.comment.content = "";
  }

}
