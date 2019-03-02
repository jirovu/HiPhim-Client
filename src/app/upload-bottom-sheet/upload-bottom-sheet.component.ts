import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { Movie } from '../models/Movie';
import { UserServiceService } from '../services/restapi/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-bottom-sheet',
  templateUrl: './upload-bottom-sheet.component.html',
  styleUrls: ['./upload-bottom-sheet.component.css']
})
export class UploadBottomSheetComponent implements OnInit {
  categogries: string[] = [
    'Action',
    'Romantic',
    'Cartoon',
    'Comedy'
  ];
  movie: Movie = new Movie();
  file: File;

  constructor(private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  async onUpload() {
    try {
      await this.userService.uploadFile(this.movie, this.file);
      this.snackBar.open('Upload successfully', 'OK');
      this.router.navigate(['/personal/user']);
    } catch (error) {
      this.snackBar.open('Failed to upload', 'OK');
    }
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSelect(event) {
    this.movie.category = event.source.value;
  }
}
