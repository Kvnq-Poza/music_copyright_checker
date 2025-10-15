import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MusicCheckerService } from '../../services/music-checker.service';
import { ToastService } from '../../services/toast.service';
import { SignupService } from '../../services/signup.service';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';

@Component({
  selector: 'app-music-checker',
  templateUrl: './music-checker.component.html',
  styleUrls: ['./music-checker.component.css'],
})
export class MusicCheckerComponent implements OnInit, OnDestroy {
  @Output() resultsChange = new EventEmitter<any[]>();
  @ViewChild('targetElement') targetElement!: ElementRef;

  @Input() heading1 = 'Check Your Music Rights Now!';
  @Input() content1 =
    'Get instant copyright verification for hassle-free uploads. Try it now for free!';
  @Input() action1 = 'Check';

  textinputPlaceholder = 'Enter YouTube Link (e.g., https://youtube.com/...)';

  search_query = '';
  results: any[] = [];
  clicked = false;
  isLogged = false;
  checkButtonText = 'Check';
  lastChecked: any = [];
  relatedVideos: any[] = [];
  searchTime: number | null = null;
  copied = false;
  copyrightData: any = null;

  private currentSearchSub: Subscription | null = null;

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
    this.getLastChecked(8);
  }

  ngOnDestroy(): void {
    // cleanup subscription if component destroyed
    if (this.currentSearchSub) {
      this.currentSearchSub.unsubscribe();
      this.currentSearchSub = null;
    }
  }

  showCopiedMessage(): void {
    if (!this.results || !this.results.length) {
      this.toastService.showToast('info', 'No result to copy');
      return;
    }
    navigator.clipboard
      .writeText(
        this.results[0].title + '\nChecked on the website: https://tubemusic.io'
      )
      .then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      })
      .catch(() => {
        this.toastService.showToast('error', 'Failed to copy to clipboard');
      });
  }

  scrollToElement(): void {
    if (!this.targetElement) return;
    this.targetElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isAuth(): boolean {
    this.isLogged = this.userService.isAuth();
    return this.isLogged;
  }

  private isYouTubeUrl(q: string): boolean {
    if (!q) return false;
    return /(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i.test(
      q
    );
  }

  // Extracts a video id from well-known YouTube URL patterns.
  private extractYouTubeId(url: string): string | null {
    if (!url) return null;
    // handle embed, watch?v=, youtu.be short urls
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
    const m = url.match(regex);
    if (m && m[1]) return m[1];
    // fallback: try to read v= param
    try {
      const paramsPart = url.split('?')[1] || '';
      const params = new URLSearchParams(paramsPart);
      const v = params.get('v');
      if (v && v.length === 11) return v;
    } catch (e) {
      // ignore
    }
    return null;
  }

  private makeEmbedUrlFromAny(urlOrIdOrUrlLike: string): SafeResourceUrl {
    // if a full url, extract ID; if ID-like, use it as id
    let videoId: string | null = null;
    if (this.isYouTubeUrl(urlOrIdOrUrlLike)) {
      videoId = this.extractYouTubeId(urlOrIdOrUrlLike);
    } else if (/^[A-Za-z0-9_-]{11}$/.test(urlOrIdOrUrlLike)) {
      videoId = urlOrIdOrUrlLike;
    }
    if (!videoId) {
      // fallback: trust input as-is (sanitized)
      return this.sanitizer.bypassSecurityTrustResourceUrl(urlOrIdOrUrlLike);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  private startSearchTimer(): number {
    return Date.now();
  }

  private finalizeSearch(start: number) {
    const elapsed = (Date.now() - start) / 1000;
    this.searchTime = Math.round(elapsed * 100) / 100;
  }



  searchByUrl(): void {
    if (!this.search_query || !this.search_query.trim()) {
      this.toastService.showToast('error', "Search query can't be empty");
      return;
    }

    if (!this.isYouTubeUrl(this.search_query)) {
      this.toastService.showToast('error', 'Please enter a valid YouTube URL');
      return;
    }

    const start = this.startSearchTimer();
    this.cancelOngoingSearch();
    this.clicked = true;
    this.checkButtonText = 'Checking...';

    this.currentSearchSub = this.musicService
      .checkCopyright(this.search_query.trim())
      .pipe(
        finalize(() => {
          this.finalizeSearch(start);
          this.clicked = false;
          this.checkButtonText = 'Check';
        })
      )
      .subscribe(
        (response: any) => {
          if (response?.success && response?.data) {
            this.copyrightData = response.data;
            this.results = [this.copyrightData];
            this.emitResults('results');
          } else {
            this.toastService.showToast('error', 'Failed to check copyright');
          }
        },
        (error: any) => {
          this.toastService.showToast(
            'error',
            'Failed to check copyright, please try again'
          );
          console.error('searchByUrl error:', error);
        }
      );
  }

  private cancelOngoingSearch(): void {
    if (this.currentSearchSub) {
      this.currentSearchSub.unsubscribe();
      this.currentSearchSub = null;
    }
  }

  emitResults(source: string): void {
    // Emit the results array so parent components can react
    this.resultsChange.emit(this.results);
  }

  submitForm(form: NgForm): void {
    this.results = [];
    this.copyrightData = null;

    if (!this.search_query || !this.search_query.trim()) {
      this.toastService.showToast('error', "Search query can't be empty");
      return;
    }

    this.searchByUrl();
  }

  likeVideo(videoId: string): void {
    this.musicService.likeVideo(videoId).subscribe((response: any) => {
      if (response?.success) {
        this.toastService.showToast('success', 'Video liked successfully');
      } else {
        this.toastService.showToast('error', 'Failed to like video');
      }
    });
  }

  saveMusic(track: any): void {
    if (!this.isLogged) {
      this.toastService.showToast('error', 'You need to login to save music');
      this.router.navigate(['/sign-in']);
      return;
    }

    const musicData = {
      videoId: track.video_id,
      title: track.name,
      thumbnail: track.thumbnail,
      url: `https://youtube.com/watch?v=${track.video_id}`,
      tags: [track.genre, track.mood].filter(Boolean),
    };

    this.musicService.createMusic(musicData).subscribe(
      (response: any) => {
        this.toastService.showToast('success', 'Music saved successfully');
      },
      (error: any) => {
        if (
          error?.status === 400 &&
          (error?.error?.message || '').toLowerCase().includes('already exists')
        ) {
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
  }

  playSong(url: string) {
    const embedUrl = this.makeEmbedUrlFromAny(url);
    this.dialog.open(MusicDialogComponent, {
      data: { url: embedUrl },
      width: '50%',
      height: '55%',
    });
  }

  openLastCheckedModal(item: any): void {
    const embedUrl = item?.url ? this.makeEmbedUrlFromAny(item.url) : null;

    this.dialog.open(MusicDialogComponent, {
      data: {
        url: embedUrl,
        title: item.title,
        thumbnail: item.thumbnail,
        tags: item.tags || [],
        license: item.license || null,
        description: item.description || null,
        duration: item.duration || null,
      },
      width: '80%',
      maxWidth: '800px',
      height: '80%',
    });
  }

  getLastChecked(n: number): void {
    this.musicService
      .getLastChecked(n)
      .subscribe((response: any) => (this.lastChecked = response || []));
  }

  safePipe(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToDownload(videoId: string): void {
    const url = `https://youtube.com/watch?v=${videoId}`;
    this.router.navigate(['/audio-download'], { queryParams: { url } });
  }

  formatNumber(num: number): string {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  moveUp() {
    this.emitResults('input-clicked');
  }
}
