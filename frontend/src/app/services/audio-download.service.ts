import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioDownloadService {
  private baseUrl = 'https://freelikes.org/yt-api';

  constructor(private http: HttpClient) {}

  async getVideoInfo(url: string): Promise<any> {
    const response = await this.http.post(`${this.baseUrl}/video_info`, { url }).toPromise();
    return response;
  }

  async downloadAudio(url: string): Promise<any> {
    const response = await this.http.post(`${this.baseUrl}/download`, {
      url,
      format: 'mp3'
    }).toPromise();
    return response;
  }

  async getJobStatus(jobId: string): Promise<any> {
    const response = await this.http.get(`${this.baseUrl}/status/${jobId}`).toPromise();
    return response;
  }
}