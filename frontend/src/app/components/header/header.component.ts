import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private toastService: ToastService, private userService: SignupService) {}

  ngOnInit(): void {
    this.isAuth();
  }

  isLogged: boolean = false;

  isAuth(): boolean {
    this.isLogged = this.userService.isAuth();
    if (this.isLogged) {
      return true;
    }
    return false;
  }

  logOut(): void {
    if(this.isLogged) {
      this.userService.deleteToken();
      this.toastService.showToast('success', 'Logged out successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }

}
