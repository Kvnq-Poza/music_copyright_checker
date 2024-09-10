import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.css']
})
export class MusicDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<MusicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { url: string }) {}

  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }
}
