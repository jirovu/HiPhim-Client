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

  async ngOnInit() {
    this.movies = await this.restApi.getALlMoviesByUser();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(UploadBottomSheetComponent);
  }

  async onChangePass() {
    try {
      await this.restApi.changePassForUser(this.user);
      this.showSnackBar('Change Password successfully', 'Ok', 3000);
    } catch (e) {
      this.showSnackBar('Failed to change password', 'Ok', 3000);
    } finally {
      this.user.password = this.repeatPass = "";
    }
  }

  async onEditMovie() {
    try {
      this.movies = await this.restApi.editMovie(this.movie);
      this.showSnackBar('Edit movie successfully', 'Ok', 3000);
    } catch (error) {
      this.showSnackBar('Failed to edit movie', 'Ok', 3000);
    }
  }

  async onDeleteMovie() {
    try {
      this.movies = await this.restApi.deleteMovie(this.movie);
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