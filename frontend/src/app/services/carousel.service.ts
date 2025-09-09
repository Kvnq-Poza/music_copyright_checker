import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicCheckerService } from './music-checker.service';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private carouselItemsSubject = new BehaviorSubject<any[]>([]);
  public carouselItems$ = this.carouselItemsSubject.asObservable();

  constructor(private musicService: MusicCheckerService) {
    this.loadCarouselItems();
  }

  // Load music from the grid

  loadCarouselItems() {
    // Use getAllMusics with limit of 6 for carousel
    this.musicService.getMusics(6, 7).subscribe({
      next: (items) => {
        // Extract the data array from the response if it's paginated
        const musicItems = items.data || items;
        this.carouselItemsSubject.next(musicItems);
      },
      error: () => {
        // Fallback to last checked musics if getAllMusics fails
        this.musicService.getLastChecked(6).subscribe({
          next: (items) => {
            this.carouselItemsSubject.next(items);
          },
        });
      },
    });
  }

  refreshCarousel() {
    this.loadCarouselItems();
  }

  getCarouselItems(): Observable<any[]> {
    return this.carouselItems$;
  }
}
