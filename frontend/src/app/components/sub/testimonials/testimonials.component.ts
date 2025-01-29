import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Thomas',
      role: 'Music Producer',
      image: 'avataaars.png',
      quote: 'As a vlogger, I used to worry constantly about copyright strikes. That’s when I came across this YouTube song copyright checker. Now, I can verify several audio tracks within seconds. I love knowing that my videos are safe to upload.',
      rating: 5
    },
    {
      name: 'Raphael',
      role: 'Independent Artist',
      image: 'avataaars1.png',
      quote: 'I’ve tried other copyright checkers, but none compare to this one. No subscriptions. No sign-ups. We can check the audio directly. You’re doing a great service!',
      rating: 5
    },
    {
      name: 'Kuljit',
      role: 'Studio Manager',
      image: 'avataaars2.png',
      quote: 'What a cool tool! I’ve been using this for years and have not yet faced any copyright issues.  I highly recommend this to any YT content creator who plans to use music in the video.',
      rating: 5
    }
  ];
}
