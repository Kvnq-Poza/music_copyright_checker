import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-features2',
  templateUrl: './features2.component.html',
  styleUrl: './features2.component.css'
})
export class Features2Component {
  @Input()
  feature3Description: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.'
  @Input()
  feature1ImgAlt: string = 'feature 1'
  @Input()
  feature1Description: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.'
  @Input()
  feature3ImgAlt: string = 'image'
  @Input()
  feature2Title: string = 'Instant Copyright Check'
  @Input()
  feature1Title: string = 'Feature #1'
  @Input()
  feature1ImgSrc: string =
    'https://images.unsplash.com/photo-1501876725168-00c445821c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature3ImgSrc: string =
    'https://images.unsplash.com/photo-1528071542637-2ca6095eaab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  feature2Description: string =
    'Enter the YouTube video link or the name of the music to instantly check its copyright status.'
  @Input()
  feature3Title: string = 'Feature #3'
  @Input()
  feature2ImgAlt: string = 'Illustration of a music note with a checkmark'
  @Input()
  feature2ImgSrc: string =
    'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080'
  activeTab: number = 0
  constructor() {}
}
