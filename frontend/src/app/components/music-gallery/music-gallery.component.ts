import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { SignupService } from '../../services/signup.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.css'],
})
export class MusicGalleryComponent implements OnInit {
  constructor(
    private musicService: MusicCheckerService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  musicItems: any[] = []; // Array to hold music data
  currentPage: number = 1; // Current page for pagination
  pageSize: number = 8; // Items per page
  totalPages: number = 0; // Total pages for pagination
  limit = 100;
  tags: string[] = [
    'Background',
    'Vlog Music',
    'EDM',
    'Gaming Music',
    'Relax',
    'Jazz',
  ];
  selectedTag: string | null = '';
  filteredMusicItems: any[] = [];
  currentTag: string | null = null;

  ngOnInit() {
    this.getMusics();
    this.calculateTotalPages();
    this.route.paramMap.subscribe((params) => {
      this.currentTag = params.get('tag');
      this.selectedTags(this.currentTag);
      if (this.currentTag) {
        console.log(this.currentTag);
      }
    });
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle(
      '100% Free Music | Find Music That Is NOT Copyrighted!'
    );

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Discover a huge collection of copyright-free music for your videos, streams, and projects. No claims, no strikesâ€"just safe-to-use tracks',
    });
  }

  getMusics(): void {
    this.musicService
      .getMusics(this.limit, this.currentPage)
      .subscribe((response: any) => {
        this.musicItems = response;
        this.filteredMusicItems = this.musicItems;
        this.calculateTotalPages();
        this.filterMusicItems();
      });
  }

  selectedTags(tag: string | null) {
    this.selectedTag = tag;
    this.filterMusicItems();
    console.log(tag);
  }

  filterMusicItems() {
    if (this.selectedTag) {
      this.filteredMusicItems = this.musicItems.filter((item) =>
        item.tags.includes(this.selectedTag)
      );
    } else {
      this.filteredMusicItems = this.musicItems;
    }
  }

  // Calculate the total number of pages based on the items
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.musicItems.length / this.pageSize);
  }

  // Get the items to display for the current page
  getPaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredMusicItems.length
    );
    return this.filteredMusicItems.slice(startIndex, endIndex);
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

  // Modified playSong method to match carousel's openMusicModal functionality
  playSong(song: any) {
    const embedUrl = this.getEmbedUrl(song.url);
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      data: {
        url: embedUrl,
        title: song.title,
        thumbnail: song.thumbnail,
        tags: song.tags,
      },
      width: '80%',
      maxWidth: '800px',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private getEmbedUrl(url: string): SafeResourceUrl {
    console.log('URL:', url);
    const videoId = url.split('v=')[1]?.split('&')[0];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  tagClicked(tag: string) {
    this.router.navigate(['/no-copyright-music', tag]);
  }

  // getTags(): string[] {
  //   this.musicService.getTags().subscribe((response: any) => {
  //     console.log(response);
  //    this.categories= response.map((tag: any) =>  [tag.tagName, tag.count])
  //     });
  //     return this.categories;
  // }
}
