import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioDownloadService } from '../../services/audio-download.service';
import { ToastService } from '../../services/toast.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-audio-download',
  templateUrl: './audio-download.component.html',
  styleUrls: ['./audio-download.component.css'],
})
export class AudioDownloadComponent implements OnInit, OnDestroy {
  url: string = '';
  isLoadingInfo: boolean = false;
  isDownloading: boolean = false;
  videoInfo: any = null;
  jobId: string | null = null;
  progress: string = '0%';
  status: string = '';
  message: string = '';
  downloadUrl: string | null = null;
  private socket: Socket | null = null;
  step: 'input' | 'info' | 'downloading' | 'completed' = 'input';

  constructor(
    private audioService: AudioDownloadService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  async fetchVideoInfo() {
    if (!this.url.trim()) {
      this.toastService.showToast('error', 'Please enter a valid YouTube URL');
      return;
    }

    if (this.isLoadingInfo || this.isDownloading) {
      return;
    }

    this.isLoadingInfo = true;
    this.resetProgress();

    try {
      const response = await this.audioService.getVideoInfo(this.url);
      this.videoInfo = response;
      this.step = 'info';
      this.toastService.showToast('success', 'Video info loaded!');
    } catch (error: any) {
      this.toastService.showToast(
        'error',
        error.message || 'Failed to fetch video info'
      );
      this.step = 'input';
      this.videoInfo = null;
    } finally {
      this.isLoadingInfo = false;
    }
  }

  async startDownload() {
    this.isDownloading = true;
    this.step = 'downloading';
    this.resetProgress();

    try {
      const response = await this.audioService.downloadAudio(this.url);

      if (response.directDownload) {
        this.downloadUrl = response.downloadUrl;
        this.step = 'completed';
        this.toastService.showToast('success', 'Download ready!');
      } else {
        this.jobId = response.jobId;
        this.connectWebSocket();
        this.toastService.showToast('info', 'Processing started...');
      }
    } catch (error: any) {
      this.toastService.showToast('error', error.message || 'Download failed');
      this.step = 'info';
    } finally {
      this.isDownloading = false;
    }
  }

  private connectWebSocket() {
    if (!this.jobId) return;

    this.socket = io('https://freelikes.org', {
      path: '/yt-api/socket.io/',
    });

    this.socket.emit('subscribe-job', this.jobId);

    this.socket.on('job-update', (jobData: any) => {
      let progressValue = jobData.progress || '0%';
      if (typeof progressValue === 'string' && progressValue.includes('%')) {
        const numValue = parseFloat(progressValue.replace('%', ''));
        this.progress = numValue.toFixed(2) + '%';
      } else {
        this.progress = parseFloat(progressValue || 0).toFixed(2) + '%';
      }
      
      this.status = jobData.status;
      this.message = jobData.message || '';

      if (jobData.status === 'completed' && jobData.downloadUrl) {
        this.downloadUrl = `https://freelikes.org/yt-api/file/${this.jobId}/${jobData.filename}`;
        this.step = 'completed';
        this.toastService.showToast('success', 'Download ready!');
        this.disconnectWebSocket();
      } else if (jobData.status === 'error') {
        this.toastService.showToast('error', 'Processing failed');
        this.step = 'info';
        this.disconnectWebSocket();
      }
    });
  }

  private disconnectWebSocket() {
    if (this.socket && this.jobId) {
      this.socket.emit('unsubscribe-job', this.jobId);
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private resetProgress() {
    this.progress = '0.00%';
    this.status = '';
    this.message = '';
    this.downloadUrl = null;
    this.jobId = null;
  }

  downloadFile() {
    if (this.downloadUrl) {
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  resetForm() {
    this.url = '';
    this.videoInfo = null;
    this.step = 'input';
    this.isLoadingInfo = false;
    this.isDownloading = false;
    this.resetProgress();
    this.disconnectWebSocket();
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getProgressPercentage(): number {
    if (!this.progress) return 0;
    const progressStr = this.progress.toString().replace('%', '');
    const percentage = parseFloat(progressStr) || 0;
    return Math.min(Math.max(percentage, 0), 100);
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }
}
