import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { 
  }
  // send to request to backend with list of youtube links 
  // to be added to the database

  addMusicToDatabase(links: string[]) {
    // send request to backend
    // return response
    // return this.http.post('http://localhost:3000/music/create-bulk', {links})
    return this.http.post(`${this.apiUrl}/music/create-bulk`, {links})
  }
}
