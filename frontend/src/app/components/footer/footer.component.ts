import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input()
  column2Title: string = 'Quick Links'
  @Input()
  link7: string = 'Cookie Policy'
  @Input()
  link5: string = 'Terms of Use'
  @Input()
  link8: string = 'Copyright Policy'
  @Input()
  action1: string = 'Subscribe to Newsletter'
  @Input()
  content3: string = '© 2024 Your Website. All Rights Reserved.'
  @Input()
  link4: string = 'FAQs'
  @Input()
  logoSrc: string =
    'https://presentation-website-assets.teleporthq.io/logos/logo.png'
  @Input()
  cookiesLink: string = '/cookie-policy'
  @Input()
  content2: string = 'Stay updated with our latest news and offers.'
  @Input()
  link9: string = 'Report Abuse'
  @Input()
  link6: string = 'Privacy Policy'
  @Input()
  logoAlt: string = 'Your Website Logo'
  @Input()
  link1: string = 'Home'
  @Input()
  privacyLink: string = '/privacy-policy'
  @Input()
  link10: string = 'Sitemap'
  @Input()
  column1Title: string = 'Company'
  @Input()
  termsLink: string = '/terms-of-use'
  @Input()
  link3: string = 'Contact Us'
  @Input()
  link2: string = 'About Us'
  @Input()
  socialLinkTitleCategory: string = 'Connect with Us'
  constructor() {}
}
