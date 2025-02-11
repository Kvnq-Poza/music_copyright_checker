import { Component } from '@angular/core';

@Component({
  selector: 'app-step-gallery',
  templateUrl: './step-gallery.component.html',
  styleUrl: './step-gallery.component.css'
})
export class StepGalleryComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
