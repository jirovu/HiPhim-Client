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

  constructor(private restApi: RestapiService,
    private router: Router) { }

  ngOnInit() {
    var url = this.router.url.substring("/watch".length);
    this.restApi.getMovie(url)
      .subscribe(res => {console.log(res);this.movie = res});
  }

}
