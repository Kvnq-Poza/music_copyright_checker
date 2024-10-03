import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  @Input()
  heading1: string = 'Check Copyright of Your Music'
  @Input()
  content1: string =
    'Enter the YouTube video link or the name of the video to verify its copyright status.'
  @Input()
  action1: string = 'Get Started'
  constructor() {}
}
