import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MusicCheckerService } from './music-checker.service';

@Injectable({
  providedIn: 'root'
})
export class MusicGalleryResolver implements Resolve<any> {
  constructor(private musicService: MusicCheckerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const params = {
      query: route.queryParams['q'] || '',
      genre: route.queryParams['genre'] || '',
      mood: route.queryParams['mood'] || '',
      channels: route.queryParams['channels'] ? route.queryParams['channels'].split(',') : [],
      page: +route.queryParams['page'] || 1,
      per_page: 12,
      sort: route.queryParams['sort'] || 'recent'
    };

    return forkJoin({
      videos: this.musicService.searchMusic(params).pipe(catchError(() => of({ videos: [], total_pages: 0 }))),
      genres: this.musicService.getGenres().pipe(catchError(() => of({ success: false, data: { genres: [] } }))),
      moods: this.musicService.getMoodsApi().pipe(catchError(() => of({ success: false, data: { moods: [] } }))),
      channels: this.musicService.getChannels().pipe(catchError(() => of({ success: false, data: { channels: [] } })))
    }).pipe(
      map(result => ({
        videos: result.videos.videos || [],
        totalPages: result.videos.total_pages || 0,
        genres: result.genres?.data?.genres || [],
        moods: result.moods?.data?.moods || [],
        channels: result.channels?.data?.channels || []
      }))
    );
  }
}
