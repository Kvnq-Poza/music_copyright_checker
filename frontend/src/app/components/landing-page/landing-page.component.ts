import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  

  constructor(private userService: SignupService, private renderer: Renderer2, private el: ElementRef, private titleService: Title, private metaService: Meta) {}

  parentResults: any[] = [];
  lastCheckedMusics = [];

  handleResultsChange(newResults: any) {
    // scrollup by 300 pixel
    // check window size and if it's on mobile dvice, scroll by 300px
    console.log('Results received from child:', this.parentResults);
    if (newResults == "input-clicked" && window.innerWidth < 768) {
      console.log("clicked");
      // move to searchButtonLocation
      window.scrollBy(0, 1200);
      // how to move to fixed loaction by using window.height
      
    } else {
      window.scrollBy(0, 300);
    console.log('Results received from child:', this.parentResults);
    }
}


  ngOnInit(): void {
  // this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'bg-img');
  this.userService.isAuth();
  this.setMetaData();
 }

 ngOnDestory(): void {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'bg-img');
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('Music Copyright Checker | Free & Accurate | TubeMusic.io');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: ' Instantly check if a song is copyrighted with TubeMusic.io’s free and accurate copyright checker. Avoid strikes and find safe-to-use music.' });

  }

//  

}
