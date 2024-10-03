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

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: MusicCheckerComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'music-gallery', component: MusicGalleryComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'steps', component: StepsComponent},
  {path: 'service', component: Features1Component},
  {path: 'liked-music', component: HeroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
