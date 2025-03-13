import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['../shared/legal.css']
})
export class DmcaComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('DMCA Policy | TubeMusic.io  ');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: 'Learn about TubeMusic.io’s DMCA policy, how to submit a copyright takedown request, and what steps we take to protect intellectual property.' });

  }
}
