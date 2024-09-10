import { Component, Renderer2, ElementRef } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  data: any ={
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  clicked:boolean = false;
  imagePath: string = "https://images.pexels.com/photos/96857/pexels-photo-96857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"


  constructor(private userService: SignupService, private toastService: ToastService, private renderer: Renderer2, private el: ElementRef) {}

  onSubmit(): void {
    this.clicked=true
    if(!this.data.username.trim() || !this.data.email.trim() || !this.data.password.trim()) {
      this.clicked = false;
      this.toastService.showToast('error', 'All fields are required')
      return
    }
    if (this.data.password != this.data.confirmPassword) {
      this.clicked = false;
      this.toastService.showToast('error', 'Password Not Matching')
      return
    }
    
    if (this.data) {
      this.userService.registerUser(this.data).subscribe({
        next: (response: any) => {
          this.toastService.showToast('success', 'user reistered succesfuly')
          this.clicked = false
          console.log('User registered successfully:', response);
          this.data = {
            username: '',
            email: '',
            password: ''
          }
          window.location.href = "/sign-in"
        },
        error: (error: any) => {
          this.clicked = false
          this.toastService.showToast('error', `${error.statusText}`)
          console.error('Registration error:', error);
        }
      });
    }

  }

  ngOnInit() {
    // this.renderer.addClass(document.body, 'bg-img');
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-image', 'url(' + this.imagePath + ')');
  }

  goBack() {

    window.location.href = '/';
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body, 'background-image');
;
  }


}
