import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { UploadBottomSheetComponent } from '../upload-bottom-sheet/upload-bottom-sheet.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(UploadBottomSheetComponent);
  }

}
