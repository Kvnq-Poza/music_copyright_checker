import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  @Input()
  heading1: string = 'Check Your Music Now!'
  @Input()
  content1: string =
    'Hundreds of YouTube channels are facing copyright strikes daily. Don’t be the next on the list! Our tool makes sure that you upload only copyright free YouTube songs. With our accurate results, you can focus on creating content without any worries. Try our tool now for free!'
  @Input()
  action1: string = 'TRY NOW!'
  constructor() {}
}
