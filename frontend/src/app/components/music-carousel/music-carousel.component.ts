import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'app-music-carousel',
  templateUrl: './music-carousel.component.html',
  styleUrls: ['./music-carousel.component.css'],
})
export class MusicCarouselComponent implements OnInit, OnDestroy {
  carouselItems: any[] = [];
  displayItems: any[] = [];
  currentIndex = 0;
  isLoading = true;
  private autoScrollInterval: any;
  private isHovered = false;
  isTransitioning = false;

  constructor(
    private carouselService: CarouselService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.carouselService.getCarouselItems().subscribe((items) => {
      this.carouselItems = items;
      this.setupInfiniteScroll();
      this.isLoading = false;
      if (items.length > 0) {
        this.startAutoScroll();
      }
    });
  }

  setupInfiniteScroll() {
    if (this.carouselItems.length > 0) {
      // Create multiple copies for true infinite scroll
      this.displayItems = [
        ...this.carouselItems,
        ...this.carouselItems,
        ...this.carouselItems,
      ];
      this.currentIndex = this.carouselItems.length; // Start at the middle copy
    }
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;

    setTimeout(() => {
      this.isTransitioning = false;
      // Reset to beginning of middle copy when reaching end (seamless jump)
      if (this.currentIndex >= this.carouselItems.length * 2) {
        this.currentIndex = this.carouselItems.length;
      }
    }, 500);
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;

    setTimeout(() => {
      this.isTransitioning = false;
      // Reset to end of middle copy when reaching beginning (seamless jump)
      if (this.currentIndex < this.carouselItems.length) {
        this.currentIndex = this.carouselItems.length * 2 - 1;
      }
    }, 500);
  }

  goToSlide(index: number) {
    this.currentIndex = index + this.carouselItems.length;
  }

  openMusicModal(item: any) {
    const embedUrl = this.getEmbedUrl(item.url);
    this.dialog.open(MusicDialogComponent, {
      data: {
        url: embedUrl,
        title: item.title,
        thumbnail: item.thumbnail,
        tags: item.tags,
      },
      width: '80%',
      maxWidth: '800px',
      height: '80%',
    });
  }

  private getEmbedUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1]?.split('&')[0];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isHovered) {
        this.nextSlide();
      }
    }, 2000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }
}
