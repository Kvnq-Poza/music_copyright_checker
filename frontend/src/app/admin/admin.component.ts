import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  youtubeLink: string = '';
  youtubeLinks: string[] = [];
  linkCount: number = 0;
  clicked: boolean = false;

  constructor(private adminService: AdminService) { }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target as FileReader).result as string;
        this.youtubeLinks = text.split('\n').map(link => link.trim()).filter(link => link.length > 0);
        this.linkCount = this.youtubeLinks.length; // Count the number of links
        console.log(this.youtubeLinks);
      };
      reader.readAsText(file);
    }
  }

  processLinks(): void {
    this.clicked = true;
    if (this.youtubeLinks.length > 0) {
      this.youtubeLinks.push(this.youtubeLink.trim());
      this.linkCount = this.youtubeLinks.length; // Update count when adding a single link
      this.adminService.addMusicToDatabase(this.youtubeLinks).subscribe((response: any) => {
        console.log(response);
        this.clicked = false;
      });
    }
    else {
      this.clicked = false;
    }
    console.log('Processing the following YouTube links:', this.youtubeLinks);
    // Further processing logic can be added here
  }
}
