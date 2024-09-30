import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input()
  content2: string =
    'Fill out the form below or use the contact details provided.'
  @Input()
  email1: string = 'contact@musiccopyrightcheck.com'
  @Input()
  address1: string = '123 Music Copyright Way, Suite 101, Music City, USA'
  @Input()
  content3: string = 'We aim to respond to all inquiries within 24 hours.'
  @Input()
  content1: string = 'Have a question or feedback? Reach out to us!'
  @Input()
  content4: string = 'For business inquiries, please email us directly.'
  @Input()
  heading1: string = 'Contact Us'
  @Input()
  content5: string = 'Follow us on social media for updates and news.'
  @Input()
  phone1: string = '+1-800-123-4567'
  constructor() {}

}
