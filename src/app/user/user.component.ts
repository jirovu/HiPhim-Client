import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UploadBottomSheetComponent } from '../upload-bottom-sheet/upload-bottom-sheet.component';
import { User } from '../models/User';
import { RestapiService } from '../services/restapi/restapi.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  repeatPass: string;
  movies: Array<Movie>;
  movie: Movie = new Movie();
  isEdit: boolean = false;
  isDelete: boolean = false;

  constructor(private bottomSheet: MatBottomSheet,
    private restApi: RestapiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.restApi.getALlMoviesByUser()
      .subscribe(res => {
        this.movies = res;
      });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(UploadBottomSheetComponent);
  }

  onChangePass() {
    this.restApi.changePassForUser(this.user)
      .subscribe(res => {
        this.snackBar.open('Change Password successfully', 'Ok', {
          duration: 3000,
        });
        this.user.password = this.repeatPass = "";
      },
        err => {
          this.snackBar.open('Failed to change password', 'Ok', {
            duration: 3000,
          });
          this.user.password = this.repeatPass = "";
        });
  }

  onEditMovie() {
    this.restApi.editMovie(this.movie)
      .subscribe(
        res => {
          this.movies = res;
          this.snackBar.open('Edit movie successfully', 'Ok', {
            duration: 3000,
          });
        },
        err => {
          this.snackBar.open('Failed to edit movie', 'Ok', {
            duration: 3000,
          });
        });
  }

  onDeleteMovie() {
    this.restApi.deleteMovie(this.movie)
      .subscribe(
        res => {
          this.movies = res;
          this.snackBar.open('Delete successfully', 'Ok', {
            duration: 3000,
          });
        },
        err => {
          this.snackBar.open('Failed to delete movie', 'Ok', {
            duration: 3000,
          });
        });
  }

  onSelected(movie: Movie) {
    this.isEdit = false;
    this.isDelete = false;
    this.movie = movie;
  }

}