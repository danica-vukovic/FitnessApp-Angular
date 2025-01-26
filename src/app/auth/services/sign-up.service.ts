import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../../models/sign-up-request';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signUp(signUpData: SignUpRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sign-up`, signUpData,  { responseType: 'text' as 'json' });
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/activate?token=${token}`, { responseType: 'text' as 'json' });
  }
}
