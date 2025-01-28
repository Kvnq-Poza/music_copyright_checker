import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FaqComponent {
  faqItems: FaqItem[] = [
    {
      question: 'What is Music Copyright Checker?',
      answer: 'Music Copyright Checker is a tool that helps content creators verify if a music track is safe to use in their content. It checks for copyright restrictions and provides information about licensing and usage rights.',
      isOpen: false
    },
    {
      question: 'How does the copyright checking process work?',
      answer: 'Our system analyzes the music track against multiple databases to determine its copyright status. It checks for licensing information, usage restrictions, and potential monetization claims that could affect your content.',
      isOpen: false
    },
    {
      question: 'Is the music in the gallery completely free to use?',
      answer: 'Yes, all music tracks in our gallery are either royalty-free or under Creative Commons licenses that allow for free use. However, some tracks may require attribution, so always check the specific license details provided with each track.',
      isOpen: false
    },
    {
      question: 'Can I use the checked music on multiple platforms?',
      answer: 'Generally, yes. Once a track is verified as safe to use, you can use it across different platforms. However, always review the specific licensing terms as some platforms may have additional requirements.',
      isOpen: false
    },
    {
      question: 'How often is the music gallery updated?',
      answer: 'Our music gallery is updated regularly with new tracks. We constantly add new copyright-free music to provide you with fresh options for your content creation needs.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
