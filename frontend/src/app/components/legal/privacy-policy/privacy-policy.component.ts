import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../shared/legal.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('Privacy Policy | TubeMusic.io  ');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: 'Learn how TubeMusic.io collects, uses, and protects your data. Read our privacy policy to understand your rights and how we handle information.' });

  }

}
