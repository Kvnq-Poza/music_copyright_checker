import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicCheckerComponent } from './components/music-checker/music-checker.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth.guard';
import { MusicGalleryComponent } from './components/music-gallery/music-gallery.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ContactComponent } from './components/sub/contact/contact.component';
import { StepsComponent } from './components/sub/steps/steps.component';
import { Features1Component } from './components/sub/features1/features1.component';
import { HeroComponent } from './components/sub/hero/hero.component';
import { FaqComponent } from './components/faq/faq.component';
import { OtherTextComponent } from './components/other-text/other-text.component';
import { TermsConditionsComponent } from './components/legal/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/legal/privacy-policy/privacy-policy.component';
import { CopyrightPolicyComponent } from './components/legal/copyright-policy/copyright-policy.component';
import { DmcaComponent } from './components/legal/dmca/dmca.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: MusicCheckerComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'no-copyright-music', component: MusicGalleryComponent},
  {path: 'no-copyright-music/:tag', component: MusicGalleryComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'steps', component: StepsComponent},
  {path: 'service', component: Features1Component},
  {path: 'liked-music', component: HeroComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'comparison', component: OtherTextComponent},
  {path: 'terms', component: TermsConditionsComponent},
  {path: 'privacy', component: PrivacyPolicyComponent},
  {path: 'copyright', component: CopyrightPolicyComponent},
  {path: 'dmca', component: DmcaComponent},
  {path: 'about', component: AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
