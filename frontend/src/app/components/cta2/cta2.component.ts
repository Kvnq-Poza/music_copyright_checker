import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta2',
  templateUrl: './cta2.component.html',
  styleUrl: './cta2.component.css'
})
export class Cta2Component {
  @Input()
  heading1: string = 'Avoid Copyright Strikes—Check Here!'
  @Input()
  content1: string =
    'Never let copyright worries silence your creativity. Just paste the link or enter the name of your audio to see if it’s safe. Check as much as you want for free. So, why wait? Try out our YouTube audio copyright checker now!'

}
