import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Movie } from '../models/Movie';

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

  constructor(private bottomSheetRef: MatBottomSheetRef<UploadBottomSheetComponent>) { }

  ngOnInit() {
  }

  onUpload() {
    console.log(this.movie);
  }

  onSelect(event){
    this.movie.category = event.source.value;
  }
}
