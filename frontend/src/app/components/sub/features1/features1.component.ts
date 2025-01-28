import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-features1',
  templateUrl: './features1.component.html',
  styleUrl: './features1.component.css'
})
export class Features1Component {
  @Input()
  feature1ImgAlt: string = 'Search Input for Checking Copyright'
  @Input()
  feature3Description: string = 'Our YouTube music copyright checker is created for everyone, especially beginners, to make copyright checks simple.  Just copy and paste a link or type in a song name, and you\'re good to go. '
  @Input()
  feature3Title: string = 'User-Friendly Experience'
  @Input()
  feature3ImgSrc: string =
    'https://images.unsplash.com/photo-1484712548363-bad7b2ff3878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature1ImgSrc: string =
    'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
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
    'https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature2ImgAlt: string = 'Search Options Icon'
  @Input()
  feature2Title: string = '99.99% Accuracy'
  activeTab: number = 0
  constructor() {}
}
