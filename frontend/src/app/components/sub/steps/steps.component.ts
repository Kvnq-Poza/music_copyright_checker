import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css'
})
export class StepsComponent {
  @Input()
  step1Description: string =
    'Copy and paste the YouTube video link or type the name of the music you want to check the copyright for.'
  @Input()
  step3Description: string =
    'After the check is complete, you will be able to view detailed copyright information for the provided YouTube video link or music name.'
  @Input()
  step2Title: string = "Click on 'Check Copyright'"
  @Input()
  step2Description: string =
    "Once you have entered the video link or music name, click on the 'Check Copyright' button to initiate the copyright check process."
  @Input()
  step1Title: string = 'Enter YouTube Video Link or Music Name'
  @Input()
  step3Title: string = 'View Copyright Information'
  @Input()
  step4Description: string =
    'Receive the copyright status of the music, including whether it is copyrighted, royalty-free, or has any restrictions.'
  @Input()
  step4Title: string = 'Get Copyright Status'
  constructor() {}
}
