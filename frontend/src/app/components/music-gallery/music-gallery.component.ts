import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { SignupService } from '../../services/signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.css'],
})
export class MusicGalleryComponent implements OnInit {
  videos: any[] = [];
  currentPage = 1;
  perPage = 12;
  totalPages = 0;
  query = '';
  selectedGenre = '';
  selectedMood = '';
  selectedChannels: string[] = [];
  sortBy = 'recent';
  filterType: 'genre' | 'mood' = 'genre';
  genres: string[] = [];
  moods: string[] = [];
  channels: any[] = [];
  loading = false;
  isLogged = false;
  showChannels = false;

  sortOptions = [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Oldest First', value: 'old' },
    { label: 'Most Views', value: 'views' },
    { label: 'Most Likes', value: 'likes' },
    { label: 'Engagement Rate', value: 'engagement' }
  ];

  constructor(
    private musicService: MusicCheckerService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private userService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.isLogged = this.userService.isAuth();
    this.setMetaData();
    
    this.route.data.subscribe(resolvedData => {
      if (resolvedData['data']) {
        this.videos = resolvedData['data'].videos || [];
        this.totalPages = resolvedData['data'].totalPages || 0;
        this.genres = resolvedData['data'].genres || [];
        this.moods = resolvedData['data'].moods || [];
        this.channels = resolvedData['data'].channels || [];
      }
    });
    
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.selectedGenre = params['genre'] || '';
      this.selectedMood = params['mood'] || '';
      this.selectedChannels = params['channels'] ? params['channels'].split(',') : [];
      this.sortBy = params['sort'] || 'recent';
      this.currentPage = +params['page'] || 1;
      this.filterType = params['filter'] === 'mood' ? 'mood' : 'genre';
      
      if (this.genres.length === 0) {
        this.loadFilters();
      }
      if (this.videos.length === 0) {
        this.searchVideos();
      }
    });
  }

  setMetaData() {
    this.titleService.setTitle('100% Free Music | Find Music That Is NOT Copyrighted!');
    this.metaService.updateTag({
      name: 'description',
      content: 'Discover a huge collection of copyright-free music for your videos, streams, and projects. No claims, no strikes—just safe-to-use tracks'
    });
  }

  loadFilters() {
    this.musicService.getGenres().subscribe((res: any) => {
      if (res?.success && res?.data?.genres) {
        this.genres = res.data.genres;
      }
    });

    this.musicService.getMoodsApi().subscribe((res: any) => {
      if (res?.success && res?.data?.moods) {
        this.moods = res.data.moods;
      }
    });

    this.musicService.getChannels().subscribe((res: any) => {
      if (res?.success && res?.data?.channels) {
        this.channels = res.data.channels;
      }
    });
  }

  searchVideos() {
    this.loading = true;
    this.updateUrl();
    
    const params = {
      query: this.query,
      genre: this.filterType === 'genre' ? this.selectedGenre : '',
      mood: this.filterType === 'mood' ? this.selectedMood : '',
      channels: this.selectedChannels,
      page: this.currentPage,
      per_page: this.perPage,
      sort: this.sortBy
    };

    this.musicService.searchMusic(params).subscribe(
      (res: any) => {
        this.videos = res.videos || [];
        this.totalPages = res.total_pages || 0;
        this.loading = false;
      },
      (error) => {
        console.error('Error searching videos:', error);
        this.loading = false;
      }
    );
  }

  updateUrl() {
    const queryParams: any = {};
    if (this.query) queryParams.q = this.query;
    if (this.selectedGenre) queryParams.genre = this.selectedGenre;
    if (this.selectedMood) queryParams.mood = this.selectedMood;
    if (this.selectedChannels.length) queryParams.channels = this.selectedChannels.join(',');
    if (this.sortBy !== 'recent') queryParams.sort = this.sortBy;
    if (this.currentPage > 1) queryParams.page = this.currentPage;
    if (this.filterType !== 'genre') queryParams.filter = this.filterType;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.searchVideos();
  }

  selectFilter(value: string) {
    if (this.filterType === 'genre') {
      this.selectedGenre = value;
      this.selectedMood = '';
    } else {
      this.selectedMood = value;
      this.selectedGenre = '';
    }
    this.currentPage = 1;
    this.searchVideos();
  }

  toggleFilterType() {
    this.filterType = this.filterType === 'genre' ? 'mood' : 'genre';
    this.selectedGenre = '';
    this.selectedMood = '';
    this.currentPage = 1;
    this.searchVideos();
  }

  toggleChannel(channelId: string) {
    const index = this.selectedChannels.indexOf(channelId);
    if (index > -1) {
      this.selectedChannels.splice(index, 1);
    } else {
      this.selectedChannels.push(channelId);
    }
  }

  applyChannelFilter() {
    this.currentPage = 1;
    this.showChannels = false;
    this.searchVideos();
  }

  onSortChange() {
    this.currentPage = 1;
    this.searchVideos();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchVideos();
    }
  }

  openVideoDialog(video: any) {
    const embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.video_id}`
    );
    
    this.dialog.open(MusicDialogComponent, {
      data: {
        url: embedUrl,
        title: video.name,
        thumbnail: video.thumbnail,
        tags: [video.genre, video.mood].filter(Boolean),
        description: video.description,
        duration: video.duration,
        author: video.author,
        views: video.views,
        likes: video.likes,
        videoId: video.video_id,
        genre: video.genre,
        subGenre1: video.sub_genre1,
        subGenre2: video.sub_genre2,
        mood: video.mood,
        subMood1: video.sub_mood1,
        subMood2: video.sub_mood2,
        uploadDate: video.upload_date,
        channelName: video.channel_name
      },
      width: '90%',
      maxWidth: '900px',
      height: 'auto',
      maxHeight: '90vh'
    });
  }

  saveMusic(video: any, event: Event) {
    event.stopPropagation();
    
    if (!this.isLogged) {
      this.toastService.showToast('error', 'You need to login to save music');
      this.router.navigate(['/sign-in']);
      return;
    }

    const musicData = {
      videoId: video.video_id,
      title: video.name,
      thumbnail: video.thumbnail,
      url: `https://youtube.com/watch?v=${video.video_id}`,
      tags: [video.genre, video.mood].filter(Boolean)
    };

    this.musicService.createMusic(musicData).subscribe(
      () => {
        this.toastService.showToast('success', 'Music saved successfully');
      },
      (error: any) => {
        if (error?.status === 400 && (error?.error?.message || '').toLowerCase().includes('already exists')) {
          this.toastService.showToast('error', 'Music already exists');
        } else {
          this.toastService.showToast('error', 'An error occurred while saving music');
        }
      }
    );
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

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
