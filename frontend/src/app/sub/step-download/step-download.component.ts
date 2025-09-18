import { Component } from '@angular/core';

@Component({
  selector: 'app-step-download',
  templateUrl: './step-download.component.html',
  styleUrl: '../step-gallery/step-gallery.component.css',
})
export class StepDownloadComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
