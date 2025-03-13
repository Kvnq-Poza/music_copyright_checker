import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-copyright-policy',
  templateUrl: './copyright-policy.component.html',
  styleUrls: ['../shared/legal.css']
})
export class CopyrightPolicyComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('Copyright Policy | TubeMusic.io  ');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: 'Read TubeMusic.io’s copyright policy to learn how we handle copyright claims, music ownership, and content protection on our platform.' });

  }

}
