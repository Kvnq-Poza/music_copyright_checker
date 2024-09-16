import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceLimits } from 'worker_threads';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MusicCheckerService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }

  getVidsByName(search_query: string): Observable<any> {
    // return this.http.get<any>(`http://localhost:3000/youtube/video-by-name?video_name=${search_query}`)
    return this.http.get<any>(`${this.apiUrl}/youtube/video-by-name?video_name=${search_query}`)
  }
  getVidsById(videoId: string): Observable<any> {
    // return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
    return this.http.get<any>(`${this.apiUrl}/youtube/video?video_id=${videoId}`)
  }

  getLicense(videoId: string): Observable<any> {
    // return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
    return this.http.get<any>(`${this.apiUrl}/youtube/license?video_id=${videoId}`)
  }

  likeVideo(videoId: string): Observable<any> {
    // return this.http.post<any>(`http://localhost:3000/youtube/music`, {video_id: videoId})
    return this.http.post<any>(`${this.apiUrl}/youtube/music`, {video_id: videoId})
  }
  getMusics(limit: number, page: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:3000/music/all`, { params: { limit: limit.toString(), page: page.toString() } })
    return this.http.get<any>(`${this.apiUrl}/music/all`, { params: { limit: limit.toString(), page: page.toString() } })
  }
  createMusic(data: any): Observable<any> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
  
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Make the POST request with the headers
    // return this.http.post<any>('http://localhost:3000/music', data, { headers });
    return this.http.post<any>(`${this.apiUrl}/music`, data, { headers });
  }
  getMusicsByUser(limit: number, page: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get<any>(`http://localhost:3000/music/user`, { params: { limit: limit.toString(), page: page.toString() }, headers })
    return this.http.get<any>(`${this.apiUrl}/music/user`, { params: { limit: limit.toString(), page: page.toString() }, headers })
  }

  getTags(): Observable<any> {
    // return this.http.get<any>(`http://localhost:3000/tags/top/10`)
    return this.http.get<any>(`${this.apiUrl}/tags/top/10`)
  }
  
}
