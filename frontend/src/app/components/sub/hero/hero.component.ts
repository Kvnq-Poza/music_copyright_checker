import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MusicCheckerService } from '../../../services/music-checker.service';
import { SignupService } from '../../../services/signup.service';
import { MusicDialogComponent } from '../../music-dialog/music-dialog.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(private musicService: MusicCheckerService, private sanitizer: DomSanitizer, private dialog: MatDialog, private userService: SignupService, private renderer: Renderer2, private el: ElementRef) {}
  musicItems: any[] = [];  // Array to hold music data
  currentPage: number = 1;  // Current page for pagination
  pageSize: number = 8;  // Items per page
  totalPages: number = 0;  // Total pages for pagination
  limit = 100;
  tags: string[] = ['Background', 'Vlog Music', 'EDM', 'Gaming Music', 'Relax', 'Jazz'];
  selectedTag: string | null = '';
  filteredMusicItems: any[] = [];
  likedMusicItems: any[] = []; 
  isLogged: boolean = false;
  

  ngOnInit() {
    // Mock data, replace with actual data fetch from an API or service
    this.isAuth();
    this.getMusicsByUser();

    this.calculateTotalPages();
  }

  isAuth(): boolean {
    this.isLogged = this.userService.isAuth();
    if (this.isLogged) {
      return true;
    }
    return false;
  }

  getMusics(): void {
      this.musicService.getMusics(this.limit, this.currentPage).subscribe((response: any) => {
        this.musicItems = response;
        this.filteredMusicItems = this.musicItems;
        this.calculateTotalPages();
      });
    }

    getMusicsByUser(): void {
        if (this.isLogged) {
          this.musicService.getMusicsByUser(this.limit, this.currentPage).subscribe((response: any) => {
            this.likedMusicItems = response;
            this.calculateTotalPages();
          });
        }
      }

    

   





  // Calculate the total number of pages based on the items
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.likedMusicItems.length / this.pageSize);
  }

  // Get the items to display for the current page
  getPaginatedItems() {
  
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.likedMusicItems.length);
    return this.likedMusicItems.slice(startIndex, endIndex);
  }

  // Change page handler
  changePage(direction: string) {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Set the current page based on number
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  playSong(url: string) {
      const embedUrl = this.getEmbedUrl(url);
      const dialogRef = this.dialog.open(MusicDialogComponent, {
        data: { url: embedUrl },
        width: '50%',
        height: '55%'
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  
    private getEmbedUrl(url: string): SafeResourceUrl {
      const videoId = url.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
}
