import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { Movie } from '../models/Movie';
import { RestapiService } from '../services/restapi/restapi.service';

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

  constructor(private bottomSheetRef: MatBottomSheetRef<UploadBottomSheetComponent>,
    private restApi: RestapiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async onUpload() {
    try {
      await this.restApi.uploadFile(this.movie, this.file);
      this.snackBar.open('Upload successfully', 'OK');
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
