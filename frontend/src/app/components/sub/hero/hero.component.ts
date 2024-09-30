import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  @Input()
  image3Src: string =
    'https://images.unsplash.com/photo-1480457330430-f47a04086de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOHw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image8Alt: string = 'Hero Image'
  @Input()
  image2Src: string =
    'https://images.unsplash.com/photo-1494203484021-3c454daf695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image6Alt: string = 'Hero Image'
  @Input()
  image11Src: string =
    'https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image5Alt: string = 'Hero Image'
  @Input()
  image1Alt: string = 'Copyright Check Image'
  @Input()
  image7Src: string =
    'https://images.unsplash.com/photo-1461360228754-6e81c478b882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image7Alt: string = 'Hero Image'
  @Input()
  image12Alt: string = 'Hero Image'
  @Input()
  image2Alt: string = 'Hero Image'
  @Input()
  image6Src: string =
    'https://images.unsplash.com/photo-1524693220625-1ce88de88992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image12Src: string =
    'https://images.unsplash.com/photo-1445375011782-2384686778a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image3Alt: string = 'Hero Image'
  @Input()
  image9Src: string =
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image11Alt: string = 'Hero Image'
  @Input()
  action1: string = 'Check'
  @Input()
  image8Src: string =
    'https://images.unsplash.com/photo-1437751695201-298be97a82a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image5Src: string =
    'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image4Src: string =
    'https://images.unsplash.com/photo-1535740560992-3a223ab7ef78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image10Alt: string = 'Hero Image'
  @Input()
  image4Alt: string = 'Hero Image'
  @Input()
  heading1: string = 'Check Copyright of Your Music'
  @Input()
  content1: string =
    'Enter the YouTube video link or the name of the music to verify its copyright status.'
  @Input()
  image10Src: string =
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  image9Alt: string = 'Hero Image'
  @Input()
  image1Src: string =
    'https://images.unsplash.com/photo-1501876725168-00c445821c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxM3w&ixlib=rb-4.0.3&q=80&w=1080'
  @Input()
  textinputPlaceholder: string = 'placeholder'
  constructor() {}
}
