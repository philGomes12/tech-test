import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-check-movie-modal',
  templateUrl: './check-movie-modal.component.html',
  styleUrls: ['./check-movie-modal.component.css']
})
export class CheckMovieModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckMovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  close(value: any) {
    this.dialogRef.close(value);
  }

}
