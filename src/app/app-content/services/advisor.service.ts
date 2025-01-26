import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  private apiUrl = 'http://localhost:8080/advisors';

  constructor(private httpClient: HttpClient, private authService: AuthService
  ) {}
  public getAdvisors() {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(this.apiUrl, header);
  }

}
