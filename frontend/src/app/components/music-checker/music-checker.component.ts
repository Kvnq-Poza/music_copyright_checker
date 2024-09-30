import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import { ToastService } from '../../services/toast.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SignupService } from '../../services/signup.service';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { MatCardImage } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-music-checker',
  templateUrl: './music-checker.component.html',
  styleUrl: './music-checker.component.css'
})
export class MusicCheckerComponent implements OnInit {
  @Output() resultsChange = new EventEmitter<any[]>();

  imageData = [
    {
      src: 'https://images.unsplash.com/photo-1480457330430-f47a04086de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOHw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYwOXw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMHw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1524693220625-1ce88de88992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1445375011782-2384686778a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1437751695201-298be97a82a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMXw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1535740560992-3a223ab7ef78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxMnw&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Hero Image'
    },
    {
      src: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzU5NTYxM3w&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Copyright Check Image'
    }
  ];
  @Input()
  heading1: string = 'Check Copyright of Your Music'
  @Input()
  content1: string =
    'Enter the YouTube video link or the name of the video to verify its copyright status.'
  @Input()
  action1: string = 'Check'

   @Input()
  textinputPlaceholder: string = 'placeholder'

  search_query: string = '';
  results: any[] = []
  searchType: string = 'name';
  clicked: boolean = false;
  isLogged: boolean = false;
  checkButtonText: string = 'Check';
  lastChecked: any = [];

  constructor(private musicService: MusicCheckerService, private toastService: ToastService, private dialog: MatDialog, private sanitizer: DomSanitizer, private userService: SignupService) {}

  ngOnInit(): void {
    this.isAuth();
    this.getLastChecked(8);

  }

  isAuth(): boolean {
    this.isLogged = this.userService.isAuth();
    if (this.isLogged) {
      return true;
    }
    return false;
  }

  searchByName(): void {
    this.checkButtonText = 'Checking...';
    this.musicService.getVidsByName(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      this.search_query = '';
      console.log(response)
      this.clicked = false;
      this.checkButtonText = 'Check';
      this.emitResults('results');
      return response
    });
  }

  searchById(): void {
    this.checkButtonText = 'Checking...';
    this.musicService.getVidsById(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      this.search_query = '';
      console.log(response)
      this.clicked = false;
      this.checkButtonText = 'Check';
      this.emitResults('results');
      return response
    });
  }
  emitResults(source:string): void {
    this.resultsChange.emit(this.results);
  }


  submitForm(form: NgForm): void {
    this.results = [];

    this.clicked = true;
    console.log(this.clicked)

    if(!this.search_query.trim() && !this.search_query.trim()) {
      this.clicked = false;
      this.toastService.showToast('error', 'Search query can\'t be empty')
      return
    }

    if (this.searchType === 'name') {
      this.searchByName();

    } else {
      this.searchById();
    }

  }

  likeVideo(videoId: string): void {
    this.musicService.likeVideo(videoId).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        this.toastService.showToast('success', 'Video liked successfully');
      } else {
        this.toastService.showToast('error', 'Failed to like video');
      }
    });
  }



  saveMusic(result: any): void {
    if (this.isLogged) {
      this.musicService.createMusic(result).subscribe(
        (response: any) => {
          // Success response handling
          console.log("Music created successfully:", response);
          this.toastService.showToast('success', 'Music saved successfully');
        },
        (error: any) => {
          // Error response handling
          if (error.status === 400 && error.error.message === "Music already exists") {
            console.log("Music already exists:", error.error.message);
            this.toastService.showToast('error', 'Music already exists');
          } else {
            console.error("An error occurred while saving music:", error);
            this.toastService.showToast('error', 'An error occurred while saving music');
          }
        }
      );
    } else {
      this.toastService.showToast('error', 'You need to login to save music');
    }
  }

  playSong(url: string) {
    const embedUrl = this.getEmbedUrl(url);
    console.log(embedUrl)
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      data: { url: embedUrl },
      width: '50%',
      height: '55%'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getEmbedUrl(url: string): SafeResourceUrl {


    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  moveUp() {
    // send event to parent
    this.emitResults('input-clicked');
  }

  getLastChecked(n: number): void {
    this.musicService.getLastChecked(n).subscribe((response: any) => {
      console.log(response);
      this.lastChecked = response;
    });
  }

}
