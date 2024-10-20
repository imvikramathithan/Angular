import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Your Express server URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(postData: RegisterPostData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/api/users/register`,
      postData
    );
  }

  // Login user and get user details
  loginUser(
    email: string,
    password: string
  ): Observable<{ message: string; user: User }> {
    return this.http.post<{ message: string; user: User }>(
      `${this.baseUrl}/api/users/login`,
      { email, password }
    );
  }
}
