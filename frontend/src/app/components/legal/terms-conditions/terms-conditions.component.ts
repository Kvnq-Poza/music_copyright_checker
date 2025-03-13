import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['../shared/legal.css']
})
export class TermsConditionsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    // Set the title
    this.titleService.setTitle('Terms of Service | TubeMusic.io  ');

    // Set the meta description
    this.metaService.updateTag({ name: 'description', content: 'Review the terms and conditions of using TubeMusic.io. Understand our guidelines, user rights, and responsibilities for accessing our services.' });

  }

}
