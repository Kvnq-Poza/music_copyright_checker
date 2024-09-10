import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceLimits } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class MusicCheckerService {


  constructor(private http: HttpClient ) { }

  getVidsByName(search_query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video-by-name?video_name=${search_query}`)
  }
  getVidsById(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
  }

  getLicense(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
  }

  likeVideo(videoId: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/youtube/music`, {video_id: videoId})
  }
  getMusics(limit: number, page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/music/all`, { params: { limit: limit.toString(), page: page.toString() } })
  }
  createMusic(data: any): Observable<any> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
  
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Make the POST request with the headers
    return this.http.post<any>('http://localhost:3000/music', data, { headers });
  }
  getMusicsByUser(limit: number, page: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:3000/music/user`, { params: { limit: limit.toString(), page: page.toString() }, headers })
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/tags/top/10`)
  }
  
}
