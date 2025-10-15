import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface DialogData {
  url: string;
  title?: string;
  thumbnail?: string;
  tags?: string[];
  description?: string;
  duration?: string;
  author?: string;
  views?: number;
  likes?: number;
  videoId?: string;
  genre?: string;
  subGenre1?: string;
  subGenre2?: string;
  mood?: string;
  subMood1?: string;
  subMood2?: string;
  uploadDate?: string;
  channelName?: string;
}

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.css']
})
export class MusicDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<MusicDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  downloadAudio(): void {
    const url = `https://youtube.com/watch?v=${this.data.videoId}`;
    this.dialogRef.close();
    this.router.navigate(['/audio-download'], { queryParams: { url } });
  }

  formatNumber(num: number): string {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }
}
