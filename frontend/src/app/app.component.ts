import { Component, OnInit } from '@angular/core';
import { SignupService} from './services/signup.service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'music-license-checker';

  ngOnInit(): void {
    this.userService.isAuth();

  }

  isDarkMode = true;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  constructor(private userService: SignupService) {}


}
