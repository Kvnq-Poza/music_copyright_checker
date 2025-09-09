import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  url: string;
  title?: string;
  thumbnail?: string;
  tags?: string[];
}

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.css']
})
export class MusicDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<MusicDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
