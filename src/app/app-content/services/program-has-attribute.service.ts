import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ProgramHasAttributeRequest } from '../../models/program-has-attribute-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramHasAttributeService {

  private apiUrl = 'http://localhost:8080/program-has-attributes';

  constructor(private httpClient: HttpClient,private authService: AuthService) {}

  public addAttribute(programHasAttributeRequest: ProgramHasAttributeRequest): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(
      `${this.apiUrl}`,
      programHasAttributeRequest,
      header
    );
  }
}
