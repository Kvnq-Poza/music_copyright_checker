import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input()
  email1: string = 'contact@tubemusic.io'
  @Input()
  address1: string = '123 Music Copyright Way, Suite 101, Music City, USA'
  @Input()
  content3: string = 'Send us a message with your questions or feedback anytime.'
  @Input()
  content1: string = 'Need some assistance? Get in touch with us easily for all your music copyright queries!'
  @Input()
  content4: string = 'Reach out directly for quick support.'
  @Input()
  heading1: string = 'Contact Us'
  @Input()
  content5: string = 'Stay updated by following us on social media for the latest tips.'
  @Input()
  phone1: string = '+1 417 323 0121'
  constructor() {}

}
