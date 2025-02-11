import { Component, Input, ElementRef, ViewChildren, QueryList, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-features5',
  templateUrl: './features5.component.html',
  styleUrl: './features5.component.css'
})
export class Features5Component implements AfterViewInit {
  @Input()
  feature1ImgAlt: string = 'Search Input for Checking Copyright'
  @Input()
  feature3Description: string = 'Our YouTube music copyright checker is created for everyone, especially beginners, to make copyright checks simple.  Just copy and paste a link or type in a song name, and you\'re good to go. '
  @Input()
  feature3Title: string = 'User-Friendly Experience'
  @Input()
  feature3ImgSrc: string =
    'Multiple Search Options.png'
  @Input()
  feature1ImgSrc: string =
    'Completely Free.png'
  @Input()
  feature2Description: string = 'Our tool scans a massive database of copyrighted music worldwide. We search through popular tracks, indie music, and even lesser-known songs. So you can trust the results you get. '
  @Input()
  feature1Title: string = 'Real-Time Scanning'
  @Input()
  feature3ImgAlt: string = 'Instant Results Icon'
  @Input()
  feature1Description: string =
    'Just drop your video link, and within seconds, know if your song is safe to use. That means you can publish your content faster without worrying about copyright strikes.'
  @Input()
  feature2ImgSrc: string =
    'Instant Results.png'
  @Input()
  feature2ImgAlt: string = 'Search Options Icon'
  @Input()
  feature2Title: string = '99.99% Accuracy'
  activeTab: number = 0
  
  @ViewChildren('section1, section2, section3')
  sections!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const sectionElements = this.sections.toArray();
    
    sectionElements.forEach((section, index) => {
      const rect = section.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top >= 0 && rect.top <= windowHeight * 0.5) {
        this.activeTab = index;
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
