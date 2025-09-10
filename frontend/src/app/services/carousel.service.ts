import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicCheckerService } from './music-checker.service';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private carouselItemsSubject = new BehaviorSubject<any[]>([]);
  public carouselItems$ = this.carouselItemsSubject.asObservable();

  constructor(private musicService: MusicCheckerService) {}

  loadCarouselItems() {
    this.musicService.getMusics(6, 7).subscribe({
      next: (items) => {
        const musicItems = items.data || items;
        this.carouselItemsSubject.next(musicItems);
      },
      error: () => {
        this.musicService.getLastChecked(8).subscribe({
          next: (items) => this.carouselItemsSubject.next(items),
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
