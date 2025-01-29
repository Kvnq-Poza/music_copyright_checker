import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Music Producer',
      image: 'assets/testimonial1.jpg',
      quote: 'This tool has saved me countless hours of work. It\'s incredibly accurate and easy to use!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Independent Artist',
      image: 'assets/testimonial2.jpg',
      quote: 'As an indie artist, knowing my music is original is crucial. This copyright checker gives me peace of mind.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Studio Manager',
      image: 'assets/testimonial3.jpg',
      quote: 'The best copyright checking tool I\'ve used. Fast, reliable, and user-friendly.',
      rating: 5
    }
  ];
}
