import { Component, Renderer2, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  constructor(private userService: SignupService, private toastService: ToastService, private renderer: Renderer2, private el: ElementRef) {}

  username: string = '';
  password: string = '';
  data: any = {
    email:'',
    password:''
  }
  imagePath: string = "https://images.pexels.com/photos/96857/pexels-photo-96857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  clicked: boolean = false;

  ngOnInit() {
    // this.renderer.addClass(document.body, 'bg-img');
    //     this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', '#222');
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-image', 'url(' + this.imagePath + ')');
  }

  onSubmit(): void {
    this.clicked = true;

    if(this.data) {
      this.userService.login(this.data).subscribe({
        next: (response: any) => {
          console.log('response', response.status)
          // get the status code
          if(response.status === 400) {
      
            this.toastService.showToast('error', 'Invalid credentials')
            return;
          }
          this.toastService.showToast('success', 'User logged in successfully')
          localStorage.setItem('token', response.body.token)
          setTimeout(() => {
            window.location.href = '/';
          } , 2000);
          
          this.data = {
            email: '',
            password: ''
          }
        },
        error: (error: any) => {
          this.toastService.showToast('error', `${error.statusText}`)
          // alert('login error')
          console.error('log in error', error)
          this.clicked = false;
        }
      })
  }
}

  goBack() {

    window.location.href = '/';
  }
  toggleForm() {
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body, 'background-image');

  }


}
