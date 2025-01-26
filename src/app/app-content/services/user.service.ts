import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserRequest } from '../../models/user-request';
import { PasswordRequest } from '../../models/password-request';
import { Program } from '../../models/program';
import { ProgramWithStatus } from '../../models/program-with-status';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient, private authService: AuthService
  ) {}

  public updateUser(userRequest: UserRequest, userId: number): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.httpClient.put(`${this.apiUrl}/${userId}`, userRequest, header);
}
public changePassword(passwordRequest: PasswordRequest, userId: number): Observable<any>  {
  var header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    ),
    responseType: 'text' as 'json' 
  };
  return this.httpClient.put<any>(`${this.apiUrl}/${userId}/password`, passwordRequest, header);
}

public userHasProgram(userId: number, programId: number): Observable<boolean> {
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.authService.getAccessToken()}`
  );
  return this.httpClient.get<boolean>(
    `${this.apiUrl}/${userId}/programs/${programId}/exists`,
    { headers }
  );
}

public getMyPrograms(userId: number): Observable<Program[]> {
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.authService.getAccessToken()}`
  );

  return this.httpClient.get<Program[]>(
    `${this.apiUrl}/${userId}/my-programs`,
    { headers }
  );
}

public getPurchasedPrograms(userId: number): Observable<Program[]> {
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.authService.getAccessToken()}`
  );

  return this.httpClient.get<Program[]>(
    `${this.apiUrl}/${userId}/programs`,
    { headers }
  );
}

public isProgramFinished(userId: number, programId: number): Observable<boolean> {
  var header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    ),
  };
  return this.httpClient.get<boolean>(
    `${this.apiUrl}/${userId}/user-finished-program/${programId}`,
    header
  );
}

public getActivityLogsByUserId(userId: number) {
  var header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    ),
  };
  return this.httpClient.get<any>(
    `${this.apiUrl}/${userId}/activity-log`,
    header
  );
  }
  public getUsers() {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(this.apiUrl, header);
  }
}
