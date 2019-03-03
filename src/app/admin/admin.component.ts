import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { MatSnackBar } from '@angular/material';
import { AdminService } from '../services/restapi/adminService/admin.service';
import { Log } from '../models/Log';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: User = new User();
  repeatPass: string;
  movies: Array<Movie>;
  movie: Movie = new Movie();
  logs: Array<Log>;
  isEdit: boolean = false;
  isDelete: boolean = false;
  isBrowse: boolean = false;
  isApproved: boolean = false;

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.isBrowse = false;
    this.isEdit = false;
    this.isDelete = false;
    this.movies = await this.adminService.getAllMovies();
  }

  async onAll() {
    this.isBrowse = false;
    this.isEdit = false;
    this.isDelete = false;
    this.movies = await this.adminService.getAllMovies();
  }

  async onChangePass() {
    try {
      await this.adminService.changePassForUser(this.user);
      this.showSnackBar('Change Password successfully', 'Ok', 3000);
    } catch (e) {
      this.showSnackBar('Failed to change password', 'Ok', 3000);
    } finally {
      this.user.password = this.repeatPass = "";
    }
  }

  async showLog() {
    this.isEdit = false;
    this.isDelete = false;
    this.logs = await this.adminService.getAllLogs();
  }

  async showBrowse() {
    this.movies = await this.adminService.getAllNotApprovedMovies();
    if (this.movies.length > 0) {
      this.isBrowse = true;
    } else {
      this.isBrowse = false;
    }
  }

  async onBrowse(movie: Movie) {
    try {
      this.movies = await this.adminService.browseMovie(movie);
      this.showSnackBar('Browse movie successfully', 'Ok', 3000);
      this.isApproved = false;
    } catch (error) {
      this.showSnackBar('Failed to browse movie', 'Ok', 3000);
    }
  }

  async onEditMovie() {
    try {
      this.movies = await this.adminService.editMovie(this.movie);
      this.showSnackBar('Edit movie successfully', 'Ok', 3000);
    } catch (error) {
      this.showSnackBar('Failed to edit movie', 'Ok', 3000);
    }
  }

  async onDeleteMovie() {
    try {
      this.movies = await this.adminService.deleteMovie(this.movie);
      this.showSnackBar('Delete successfully', 'Ok', 3000);
    } catch (error) {
      this.showSnackBar('Failed to delete movie', 'Ok', 3000);
    }
  }

  showSnackBar(message: string, btn: string, duration: number) {
    this.snackBar.open(message, btn, {
      duration: duration,
    });
  }

  onSelected(movie: Movie) {
    this.isEdit = false;
    this.isDelete = false;
    this.movie = movie;
  }

}
