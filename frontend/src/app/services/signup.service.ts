import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  isLogged = false;

  registerUser(data: any): Observable<any> {
    // return this.http.post<any>(`http://localhost:3000/users`, data)
    return this.http.post<any>(`${this.apiUrl}/users`, data)
  }

  login(data: any): Observable<HttpResponse<any>> {
    // return this.http.post<any>('http://localhost:3000/auth/login', data, { observe: 'response' });
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data, { observe: 'response' });
  }

  isAuth(): boolean {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (token && !this.isTokenExpired(token)) {
      this.isLogged = true;
      return this.isLogged;
    }
    this.deleteToken();
    return false;
  }

  isTokenExpired(token: string): boolean {
    const tokenExpirationDate = this.getTokenExpirationDate(token);
    return tokenExpirationDate ? tokenExpirationDate < new Date() : true;
  }

  getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const date = new Date(0);
      date.setUTCSeconds(decodedToken.exp);
      return date;
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  deleteToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

}
