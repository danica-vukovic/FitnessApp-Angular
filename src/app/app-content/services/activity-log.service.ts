import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { ActivityLogRequest } from '../../models/activity-log';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private apiUrl = 'http://localhost:8080/activity-log';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public addActivityLog(
    fitnessTrackerRequest: ActivityLogRequest
  ): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(
      `${this.apiUrl}`,
      fitnessTrackerRequest,
      header
    );
  }
}
