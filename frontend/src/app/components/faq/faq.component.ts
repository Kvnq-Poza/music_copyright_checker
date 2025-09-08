import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';

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
export class FaqComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('Frequently Asked Questions | TubeMusic.io');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: 'Get answers to common questions about music copyright, free music, and how TubeMusic.io helps you find safe, legal tracks for your content.' });

  }
  faqStates: boolean[] = [false, false, false, false, false, false, false, false, false, false];

  toggleFaq(index: number): void {
    this.faqStates[index] = !this.faqStates[index];
  }
}
