import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import { ToastService } from '../../services/toast.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SignupService } from '../../services/signup.service';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { MatCardImage } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-music-checker',
  templateUrl: './music-checker.component.html',
  styleUrl: './music-checker.component.css',
})
export class MusicCheckerComponent implements OnInit {
  @Output() resultsChange = new EventEmitter<any[]>();
  @ViewChild('targetElement') targetElement!: ElementRef;

  @Input()
  heading1: string = 'Check Your Music Rights Now!';
  @Input()
  content1: string =
    'Get instant copyright verification for hassle-free uploads. Try it now for free!';
  @Input()
  action1: string = 'Check';

  // Add two different placeholder texts
  private nameSearchPlaceholder = 'Enter Song Name (e.g., "Shape of You")';
  private linkSearchPlaceholder =
    'Enter YouTube Link (e.g., https://youtube.com/...)';

  // Update the textinputPlaceholder property
  textinputPlaceholder = this.nameSearchPlaceholder; // default value

  // Modify searchType setter to update placeholder
  @Input()
  set searchType(value: string) {
    this._searchType = value;
    // Update placeholder based on search type
    this.textinputPlaceholder =
      value === 'name'
        ? this.nameSearchPlaceholder
        : this.linkSearchPlaceholder;
  }
  get searchType(): string {
    return this._searchType;
  }
  private _searchType: string = 'name'; // default value

  search_query: string = '';
  results: any[] = [];
  clicked: boolean = false;
  isLogged: boolean = false;
  checkButtonText: string = 'Check';
  lastChecked: any = [];
  relatedVideos: any[] = [];
  searchTime: number | null = null;
  copied: boolean = false;

  constructor(
    private musicService: MusicCheckerService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private userService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuth();
    // check request body if title is present
  }

  // Function to show the "Copied!" message
  showCopiedMessage(): void {
    // Copy a sample text (you can replace with dynamic text)
    navigator.clipboard
      .writeText(
        this.results[0].title + '\nChecked on the website: https://tubemusic.io'
      )
      .then(() => {
        this.copied = true; // Show "Copied!" message

        setTimeout(() => {
          this.copied = false; // Hide the popup after 1 second
        }, 1000);
      });
  }

  scrollToElement() {
    console.log(this.targetElement);
    this.targetElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isAuth(): boolean {
    this.isLogged = this.userService.isAuth();
    if (this.isLogged) {
      return true;
    }
    return false;
  }

  searchByName(): void {
    // IF SEARCH QUERY IS LINK THEN SEARCH BY ID

    if (this.search_query.includes('youtube.com')) {
      this.toastService.showToast('info', 'Using video link instead of name');

      this.searchById();
      return;
    }

    const searchTime = Date.now();
    this.clicked = true;
    this.checkButtonText = 'Checking...';
    this.musicService.getVidsByName(this.search_query).subscribe(
      (response: any) => {
        this.results.push(response);
        this.relatedVideos = response.relatedVideos;
        this.searchTime = (Date.now() - searchTime) / 1000;
        this.searchTime = Math.round(this.searchTime * 100) / 100;
        // this.search_query = '';
        console.log('searchByName:', response);
        this.clicked = false;
        return response;
      },
      (error: any) => {
        this.toastService.showToast(
          'error',
          'Failed to fetch video, please check the name'
        );
        this.clicked = false;
      }
    );
  }

  searchById(): void {
    // if search query is not link search by name
    if (!this.search_query.includes('youtube.com')) {
      this.toastService.showToast('info', 'Using video name instead of link');
      this.searchByName();
      return;
    }

    const searchTime = Date.now();
    this.checkButtonText = 'Checking...';
    this.musicService.getVidsById(this.search_query).subscribe(
      (response: any) => {
        this.searchTime = (Date.now() - searchTime) / 1000;

        this.searchTime = Math.round(this.searchTime * 100) / 100;
        this.results.push(response);
        // this.search_query = '';
        console.log('searchById:', response);
        this.relatedVideos = response.relatedVideos;

        this.clicked = false;
        this.checkButtonText = 'Check';
        this.emitResults('results');
        return response;
      },
      (error: any) => {
        this.toastService.showToast(
          'error',
          'Failed to fetch video, please check the link'
        );
        this.clicked = false;
      }
    );
  }

  emitResults(source: string): void {
    this.resultsChange.emit(this.results);
  }

  submitForm(form: NgForm): void {
    this.results = [];

    this.clicked = true;
    console.log(this.clicked);

    if (!this.search_query.trim() && !this.search_query.trim()) {
      this.clicked = false;
      this.toastService.showToast('error', "Search query can't be empty");
      return;
    }

    if (this.searchType === 'name') {
      this.searchByName();
    } else {
      this.searchById();
    }
  }

  likeVideo(videoId: string): void {
    this.musicService.likeVideo(videoId).subscribe((response: any) => {
      if (response.success) {
        console.log(response);
        this.toastService.showToast('success', 'Video liked successfully');
      } else {
        this.toastService.showToast('error', 'Failed to like video');
      }
    });
  }

  saveMusic(result: any): void {
    if (this.isLogged) {
      this.musicService.createMusic(result).subscribe(
        (response: any) => {
          // Success response handling
          console.log('Music created successfully:', response);
          this.toastService.showToast('success', 'Music saved successfully');
        },
        (error: any) => {
          // Error response handling
          if (
            error.status === 400 &&
            error.error.message === 'Music already exists'
          ) {
            console.log('Music already exists:', error.error.message);
            this.toastService.showToast('error', 'Music already exists');
          } else {
            console.error('An error occurred while saving music:', error);
            this.toastService.showToast(
              'error',
              'An error occurred while saving music'
            );
          }
        }
      );
    } else {
      this.toastService.showToast('error', 'You need to login to save music');
      this.router.navigate(['/sign-in']);
    }
  }

  playSong(url: string) {
    const embedUrl = this.getEmbedUrl(url);
    console.log(embedUrl);
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      data: { url: embedUrl },
      width: '50%',
      height: '85%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private getEmbedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  moveUp() {
    // send event to parent
    this.emitResults('input-clicked');
  }

  checkVideo(title: string): void {
    // this.router.navigate(['/'] , { queryParams: { title: title } });
    console.log(title);

    this.search_query = title;
    this.results = [];
    this.scrollToElement();
    this.searchByName();
  }
}
