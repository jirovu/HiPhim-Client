import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UserServiceService } from '../services/restapi/userService/user-service.service';
import { UploadBottomSheetComponent } from '../upload-bottom-sheet/upload-bottom-sheet.component';
import { AdminService } from '../services/restapi/adminService/admin.service';

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
  isEdit: boolean = false;
  isDelete: boolean = false;

  constructor(private userService: UserServiceService,
    private adminService: AdminService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.movies = await this.adminService.getAllMovies();
  }

  async onChangePass() {
    try {
      await this.userService.changePassForUser(this.user);
      this.showSnackBar('Change Password successfully', 'Ok', 3000);
    } catch (e) {
      this.showSnackBar('Failed to change password', 'Ok', 3000);
    } finally {
      this.user.password = this.repeatPass = "";
    }
  }

  showLog() {

  }

  showApproved() {

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
