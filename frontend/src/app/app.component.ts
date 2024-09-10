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

  constructor(private userService: SignupService) {}


}
