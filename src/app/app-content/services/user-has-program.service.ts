import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { UserHasProgramRequest } from '../../models/user-has-program-request';

@Injectable({
  providedIn: 'root'
})
export class UserHasProgramService {

  private apiUrl = 'http://localhost:8080/user-has-programs';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public addUserHasProgram(
    userHasProgramRequest: UserHasProgramRequest
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    );

    return this.httpClient.post<any>(
      `${this.apiUrl}`, 
      userHasProgramRequest,
      { headers }
    );
  }

}
