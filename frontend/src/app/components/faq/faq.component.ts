import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
      })),
      state('open', style({
        height: '*',
        opacity: '1',
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out'),
      ]),
    ]),
  ],
})
export class FaqComponent {
  faqStates: boolean[] = [false, false, false, false, false, false, false, false];

  toggleFaq(index: number): void {
    this.faqStates[index] = !this.faqStates[index];
  }
}
