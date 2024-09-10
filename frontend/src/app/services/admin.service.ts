import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { 
  }
  // send to request to backend with list of youtube links 
  // to be added to the database

  addMusicToDatabase(links: string[]) {
    // send request to backend
    // return response
    return this.http.post('http://localhost:3000/music/create-bulk', {links})
  }
}
