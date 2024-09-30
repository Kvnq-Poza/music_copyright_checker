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
  feature3Description: string = 'Get instant results on copyright status'
  @Input()
  feature3Title: string = 'Instant Results'
  @Input()
  feature3ImgSrc: string =
    'https://images.unsplash.com/photo-1484712548363-bad7b2ff3878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature1ImgSrc: string =
    'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature2Description: string = 'Search by video link or name'
  @Input()
  feature1Title: string = 'Quick Copyright Check'
  @Input()
  feature3ImgAlt: string = 'Instant Results Icon'
  @Input()
  feature1Description: string =
    'Enter the video link or name to check copyright'
  @Input()
  feature2ImgSrc: string =
    'https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature2ImgAlt: string = 'Search Options Icon'
  @Input()
  feature2Title: string = 'Multiple Search Options'
  activeTab: number = 0
  constructor() {}
}
