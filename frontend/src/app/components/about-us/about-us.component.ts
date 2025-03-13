import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('About Us | TubeMusic.io');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: ' Learn about TubeMusic.io, our mission, and how we help creators find copyright-free music and avoid legal issues when using music online.' });
  }
}
